import { useState, useEffect } from "react";

const qrCache = new Map<string, string>();
const QR_STYLE_VERSION = "webp-logo-v1";

const convertBlobToDataUrl = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert QR image to data URL"));
      }
    };
    reader.onerror = () => reject(new Error("Failed to read QR image blob"));
    reader.readAsDataURL(blob);
  });
};

interface QrHookResult {
  qrImageUrl: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useQrCode(data: string | undefined): QrHookResult {
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!data) {
      setQrImageUrl(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;
    const generateQr = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const cacheKey = `${QR_STYLE_VERSION}:${data}`;
        const cached = qrCache.get(cacheKey);
        if (cached) {
          if (isMounted) {
            setQrImageUrl(cached);
            setIsLoading(false);
          }
          return;
        }

        const { default: QRCodeStyling } = await import("qr-code-styling");

        const buildQrDataUrl = async (withLogo: boolean): Promise<string> => {
          const qrCode = new QRCodeStyling({
            width: 500,
            height: 500,
            type: "canvas",
            data,
            image: withLogo ? "/cards/test.webp" : undefined,
            dotsOptions: {
              type: "dots",
              gradient: {
                type: "linear",
                rotation: Math.PI / 4,
                colorStops: [
                  { offset: 0, color: "#4285f4" },
                  { offset: 1, color: "#ea4335" },
                ],
              },
            },
            cornersSquareOptions: {
              type: "extra-rounded",
              color: "#34a853",
            },
            cornersDotOptions: {
              type: "dot",
              color: "#f9ab00",
            },
            backgroundOptions: {
              color: "#ffffff",
            },
            qrOptions: {
              errorCorrectionLevel: "Q",
            },
            imageOptions: {
              margin: 8,
              imageSize: 0.4,
            },
          });

          const rawPng = await qrCode.getRawData("png");
          if (!rawPng) {
            throw new Error("QR generation returned empty image data");
          }

          const qrBlob =
            rawPng instanceof Blob
              ? rawPng
              : new Blob([rawPng as any], { type: "image/png" });
          return convertBlobToDataUrl(qrBlob);
        };

        // Fallback to QR without center logo if styled logo generation fails.
        let generatedUrl: string;
        try {
          generatedUrl = await buildQrDataUrl(true);
        } catch {
          generatedUrl = await buildQrDataUrl(false);
        }

        qrCache.set(cacheKey, generatedUrl);

        if (isMounted) {
          setQrImageUrl(generatedUrl);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : "Failed to generate QR code",
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    generateQr();

    return () => {
      isMounted = false;
    };
  }, [data]);

  return { qrImageUrl, isLoading, error };
}
