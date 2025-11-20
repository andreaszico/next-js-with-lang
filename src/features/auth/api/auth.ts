import { api, ResponseApi } from "@/core/api/client"
import { queryOptions, useMutation, useQuery } from "@tanstack/react-query"
import { GetProfileResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./dto"
import { MutationConfig, QueryConfig } from "@/config/query-config"
import { queryClient } from "@/lib/query-client"

export const userQueryKey = ["auth", "user"] as const

type UseLoginParams = {
  mutationConfig?: MutationConfig<typeof loginWithEmailAndPassword>;
};

type UseRegisterParams = {
  mutationConfig?: MutationConfig<typeof registerWithEmailAndPassword>;
};

export const getUserProfileQueryOptions = () => {
  return queryOptions({
    queryKey: ['profile'],
    queryFn: () => getUserProfile(),
  });
};

type UseUserProfileOptions = {
  queryConfig?: QueryConfig<typeof getUserProfileQueryOptions>;
};

export const getUserProfile = (): Promise<ResponseApi<GetProfileResponse>> => {
  return api.get(`/auth/me`);
};

export const loginWithEmailAndPassword = (payload: LoginRequest): Promise<ResponseApi<LoginResponse>> => {
    return api.post("/auth/login", payload)
}

export const registerWithEmailAndPassword = (payload: RegisterRequest): Promise<ResponseApi<RegisterResponse>> => {
    return api.post("/auth/register", payload)
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

export const useRegister = (params: UseRegisterParams = {}) => {
  return useMutation({
    ...params.mutationConfig,
    mutationFn: registerWithEmailAndPassword,
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

export const useUserProfile = ({
  queryConfig,
}: UseUserProfileOptions) => {
  return useQuery({
    ...getUserProfileQueryOptions(),
    ...queryConfig,
  });
};
