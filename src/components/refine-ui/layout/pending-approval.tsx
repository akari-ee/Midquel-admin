import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLogout } from "@refinedev/core";

export const PendingApproval = () => {
  const { mutate: logout } = useLogout();
  return (
    <div className="flex min-h-svh items-center justify-center px-6 py-8">
      <Card className="sm:w-[456px] p-12 border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-3xl font-semibold">승인 대기중</CardTitle>
          <CardDescription>관리자 승인 후 이용 가능합니다.</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <p className="text-muted-foreground">
            가입은 완료되었습니다. 관리자가 계정을 승인하면 접속하실 수
            있습니다.
          </p>
          <div className="mt-6 flex gap-3">
            <Button
              variant="outline"
              className="shadow-none"
              onClick={() => logout({ redirectPath: "/login" })}
            >
              다른 계정으로 로그인
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApproval;
