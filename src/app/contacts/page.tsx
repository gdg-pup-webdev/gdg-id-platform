"use client";
import { FaFacebook, FaSpinner } from "react-icons/fa";
import Button from "@/components/Button";
import { IoIosPin } from "react-icons/io";
import { CiLocationArrow1 } from "react-icons/ci";
import { GradientBorderDiv } from "@/components/GradientBorderDiv";
import Grid from "@/components/GridBackground";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import GlowBlobs from "@/components/GlowBlobs";
import { useBreakpoint } from "@/lib/client/utils";
import { useCreateMessageMutation } from "@/lib/client/apiQueries/messageQueries";
import { Message } from "@/types/message";
import { useState } from "react";

const ContactsPage = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const { isMd, isXl } = useBreakpoint();

  return (
    <div className="min-h-screen ">
      <Grid />

      <div className="hidden lg:block">
        <GlowBlobs layout="about" />
      </div>

      {/* content container */}
      <div className="w-full flex flex-col px-4 max-w-7xl mx-auto z-10 relative">
        {/* border image at the top */}
        <img
          src="/sites/contacts/border.png"
          alt="sparky "
          className="w-full my-8 hidden xl:flex"
        />

        {/* heading part */}
        <div className="flex flex-col xs:flex-row justify-center items-center w-full mx-auto  relative max-w-lg my-8 group gap-4">
          {/* sparky image */}
          <img
            src="/sites/contacts/sparky.svg"
            alt="sparky "
            className="w-20 xl:w-25 group-hover:rotate-3 transition-all duration-200 max-w-50 aspect-auto group-hover:scale-110"
          />

          {/* title part */}
          <div className="flex flex-col gap-2 items-center">
            <h1
              className={cn(
                "text-4xl xl:text-5xl font-bold leading-none pb-2", // ← add pb-1
                "bg-gradient-to-br from-gdg-orange-light to-gdg-orange-dark bg-clip-text text-transparent",
                "drop-shadow-[0_0_5px_var(--color-gdg-orange-light)]",
                "group-hover:tracking-wide transition-all duration-200",
                "text-center"
              )}
            >
              Stay Connected
            </h1>

            <p
              className={cn(
                " text-base xl:text-xl -translate-y-3",
                "group-hover:tracking-wide transition-all duration-200",
                "text-center"
              )}
            >
              Got a question? Let Sparky help.
            </p>
          </div>
        </div>

        {/* card  */}
        <div
          className={cn(
            "rounded-4xl max-w-xl xl:max-w-7xl  mx-auto w-full flex flex-col  xl:flex-row-reverse",
            !isDarkMode && "shadow-[0px_0px_5px_1px_var(--shadow)]"
          )}
        >
          {/* info */}

          <GradientBorderDiv
            borderThickness="4px"
            cornerRadius="32px"
            roundedSides={isXl ? "right" : "top"}
            className={cn("xl:flex-1")}
            innerDivClassName={cn(
              "w-full p-8 px-4 xs:px-8 flex flex-col gap-2 ",
              "bg-gradient-to-b from-surface-high to-surface",
              "xl:flex-1 h-full"
            )}
          >
            <Informations />
          </GradientBorderDiv>

          {/* <div
            className={cn(
              "w-full rounded-t-4xl border-3 border-amber-300 p-8 flex flex-col gap-4 ",
              "bg-gradient-to-b from-surface to-background-variant",
              "xl:flex-1 xl:rounded-t-none xl:rounded-r-4xl"
            )}
          >
            <Informations />
          </div> */}

          {/* map  */}
          <div className="w-full aspect-4/2 flex xl:hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7490.792102567119!2d121.0014974154361!3d14.597931912463423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9e42d5f7275%3A0x569eb3406c633fbe!2sPolytechnic%20University%20of%20the%20Philippines%20-%20Institute%20of%20Technology!5e0!3m2!1sen!2sph!4v1759661054690!5m2!1sen!2sph"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* form */}
          <div
            className={cn(
              "w-full p-8 px-4 xs:px-8  flex flex-col gap-4",
              " rounded-b-4xl ",
              isDarkMode && "border-2 border-t-0 border-outline bg-surface-low",
              "xl:flex-2 xl:rounded-b-none xl:rounded-tl-4xl xl:rounded-bl-4xl  ",
              !isDarkMode &&
                " bg-background-variant xl:backdrop-blur-sm xl:bg-background/0",
              "xl:border-2 xl:border-r-0"
            )}
          >
            <Form />
          </div>
        </div>
      </div>

      <div className="w-full h-100 xl:flex hidden my-32">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7490.792102567119!2d121.0014974154361!3d14.597931912463423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9e42d5f7275%3A0x569eb3406c633fbe!2sPolytechnic%20University%20of%20the%20Philippines%20-%20Institute%20of%20Technology!5e0!3m2!1sen!2sph!4v1759661054690!5m2!1sen!2sph"
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

const Informations = () => {
  return (
    <>
      <div className="font-bold text-3xl hover:text-gdg-orange-light transition-all duration-200 w-fit">
        Hi, I&apos;m Sparky!
      </div>
      <div className="text-sm">
        Got a question, idea, or need help with your Digital ID? Drop me a
        message and I&apos;ll make sure the right people in our team get back to
        you.
      </div>
      <div className="w-full flex flex-col gap-4 mt-4">
        {DETAILS.map((detail, index) => (
          <div key={index} className="flex flex-col xs:flex-row items-start group ">
            <div className="font-bold group-hover:text-gdg-orange-light transition-all duration-200 flex flex-row items-center gap-2">
              <div className="w-5 aspect-square">
                <img
                  src={detail.image}
                  alt="sparky "
                  className="w-full h-auto object-cover group-hover:scale-120 transition-all duration-200"
                />
              </div>
              <span>{detail.title}:</span>
            </div>
            <div className="max-xs:ml-7 ml-2">{detail.description}</div>
          </div>
        ))}
      </div>

      <div className="w-full hidden xl:flex mt-8">
        <Socials direction="col" />
      </div>
    </>
  );
};

const Form = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  const messageCreateMutation = useCreateMessageMutation();
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError(false);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    } as Message;

    console.log("submitting form:", data);

    const result = await messageCreateMutation.mutateAsync(
      { message: data },
      {
        onError: (err) => {
          setTimeout(() => {
            setError(true);
            if (err.message === "Too many requests. Try again later.") {
              setMessage("Too many requests. Try again later.");
            } else {
              setMessage("Can't send message. Please try again.");
            }
            setLoading(false);
          }, 1000);
        },
        onSuccess: (data) => {
          setTimeout(() => {
            setSuccess(true);
            setLoading(false);
          }, 1000);
        },
      }
    );

    console.log("Message created:", result);
  };
  return (
    <>
      <form
        className={cn("w-full flex flex-col gap-4")}
        onSubmit={handleSubmit}
      >
        {/* Row 1: Name and Email side by side */}
        <div className="flex flex-col xs:flex-row gap-4 w-full">
          <div className="flex flex-col w-full gap-2">
            <label className="text-text  text-sm ml-2">NAME</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className={cn(
                "w-full border-2 border-outline rounded-lg px-4 py-2 focus:border-outline/0 focus:ring-2 focus:ring-blue-500",
                "bg-surface"
              )}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label className="text-text  text-sm ml-2">EMAIL</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email Address"
              className={cn(
                "w-full border-2 border-outline rounded-lg px-4 py-2 focus:border-outline/0 focus:ring-2 focus:ring-blue-500",
                "bg-surface"
              )}
            />
          </div>
        </div>

        {/* Row 2: Subject */}
        <div className="flex flex-col w-full gap-2">
          <label className="text-text  text-sm ml-2">SUBJECT</label>
          <input
            type="text"
            name="subject"
            required
            placeholder="Subject"
            className={cn(
              "w-full border-2 border-outline rounded-lg px-4 py-2 focus:border-outline/0 focus:ring-2 focus:ring-blue-500",
              "bg-surface"
            )}
          />
        </div>

        {/* Row 3: Message */}

        <div className="flex flex-col w-full gap-2">
          <label className=" text-text  text-sm ml-2">MESSAGE</label>
          <textarea
            placeholder="Your Message"
            name="message"
            required
            rows={5}
            className={cn(
              "w-full border-2 border-outline rounded-lg px-4 py-2 focus:border-outline/0 focus:ring-2 focus:ring-blue-500",
              "bg-surface"
            )}
          />
        </div>

        {/* Row 4: Submit button */}
        <Button
          htmlType="submit"
          disabled={loading}
          className={cn(
            "w-fit    text-text px-4 py-2 font-medium text-lg  ",
            loading && "cursor-not-allowed"
          )}
        >
          <div className="flex flex-row gap-2 items-center">
            {loading ? (
              <FaSpinner className="mr-2 animate-spin" />
            ) : (
              <CiLocationArrow1 />
            )}
            <span> {loading ? "Sending..." : "Submit"}</span>
          </div>
        </Button>
        {error && <div className="w-full text-red-500 ">{message}</div>}

        {success && (
          <>
            <div className="w-full text-text ">Message sent successfully</div>
          </>
        )}

        {/* last row, socials */}

        <br />

        <div className={cn("xl:hidden w-full")}>
          <Socials />
        </div>
      </form>
    </>
  );
};

const Socials = ({ direction = "row" }: { direction?: "col" | "row" }) => {
  return (
    <div
      className={cn(
        "w-full text-xl flex  gap-2 justify-between",
        direction === "row" ? "flex-row  items-center" : "flex-col items-left"
      )}
    >
      <span className="font-bold">Follow us</span>
      <div className="flex flex-row gap-2">
        {SOCIALS.map((social, index) => (
          <a
            href={social.link}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-all duration-200"
          >
            <img
              src={social.image}
              alt={social.image}
              className="w-8 aspect-auto"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

const DETAILS: {
  image: string;
  title: string;
  description: string;
}[] = [
  {
    image: "/sites/contacts/pin.svg",
    title: "Address",
    description: "PUP A. Mabini Campus, Anonas St., Sta. Mesa, Manila",
  }, 
  {
    image: "/sites/contacts/mail.svg",
    title: "Email",
    description: "gdg.pupmnl@gmail.com",
  },
];

const SOCIALS: {
  image: string;
  link: string;
}[] = [
  {
    image: "/sites/contacts/facebook.svg",
    link: "https://www.facebook.com/gdg.pupmnl",
  },
  {
    image: "/sites/contacts/linkedin.svg",
    link: "https://www.linkedin.com/company/gdgpup",
  },
  {
    image: "/sites/contacts/ig.svg",
    link: "https://www.instagram.com/gdg.pupmnl",
  }, 
  {
    image: "/sites/contacts/tiktok.svg",
    link: "https://www.tiktok.com/@gdg.pupmnl",
  }, 
  {
    image: "/sites/contacts/github.svg",
    link: "https://github.com/gdgpupmnl",
  },
];

export default ContactsPage;
