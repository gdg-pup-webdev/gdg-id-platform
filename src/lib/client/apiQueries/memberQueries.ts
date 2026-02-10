import { Member } from "@/types/member";
import { useQuery } from "@tanstack/react-query";
import { getMember } from "../apiEndpoints/memberEndpoints";

export function useMemberQuery(email?: string) {
  const { data: member, ...rest } = useQuery<Member>({
    queryKey: ["member", email],
    queryFn: async () => {
      if (!email) throw new Error("Member email is required");
      const response = await getMember(email);
      return response;
    },
    enabled: !!email,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return { member, ...rest };
}
