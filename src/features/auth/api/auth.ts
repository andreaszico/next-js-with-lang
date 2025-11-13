import { api } from "@/core/api/client"
import { useMutation } from "@tanstack/react-query"
import { LoginRequest, LoginResponse } from "./dto"
import { MutationConfig } from "@/config/query-config"
import { queryClient } from "@/lib/query-client"

export const userQueryKey = ["auth", "user"] as const

type UseLoginParams = {
  mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword>;
};

export const loginWithEmailAndPassword = (payload: LoginRequest): Promise<{ data: LoginResponse }> => {
    return api.post("/auth/login", payload)
}

export const useLogin = (params: UseLoginParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: loginWithEmailAndPassword,
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: userQueryKey });

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context
      );
    },
  });
};