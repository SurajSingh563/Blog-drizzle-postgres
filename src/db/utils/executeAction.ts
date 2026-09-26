import { auth } from "@/lib/auth";
import { getErrorMessage } from "@/lib/utils";
import { isRedirectError } from "next/dist/client/components/redirect";
import { SERVER_DIRECTORY } from "next/dist/shared/lib/constants";

type Options<T> = {
  actionFn: {
    (): Promise<T>;
  };
  isProtected?: boolean;
  serverErrorMessage?: string;
  clientSuccessMessage?: string;
};

export async function executeAction<T>({
  actionFn,
  isProtected = true,
  serverErrorMessage = "Erro executing action",
  clientSuccessMessage = "Operation was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> {
  try {
    if (isProtected) {
      const session = await auth();
      if (!session) throw new Error("Not authorised");
    }
    await actionFn();
    return {
      success: true,
      message: clientSuccessMessage,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error(serverErrorMessage, error);
    return {
      success: false,
      message: getErrorMessage(error),
    };
  }
}
