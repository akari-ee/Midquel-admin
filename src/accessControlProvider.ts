import type { AccessControlProvider } from "@refinedev/core";
import { supabaseClient } from "@/utility";

export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    // 공개 액션은 항상 허용 (로그인/회원가입/비밀번호 찾기 등)
    const publicRules = [
      { resource: "auth", action: "login" },
      { resource: "auth", action: "register" },
      { resource: "auth", action: "forgot" },
    ];
    const isPublic = publicRules.some(
      (r) => r.resource === resource && r.action === action
    );
    if (isPublic) return { can: true };

    // 승인 여부 확인
    const { data } = await supabaseClient.auth.getUser();
    const approved = data?.user?.user_metadata?.approved === true;

    return {
      can: approved,
      reason: approved ? undefined : "승인되지 않은 계정입니다.",
    };
  },
};
