import { StatusFilter } from "@/app/types";

export const BASE_URL = "/api/todos";

export const fetcher = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("データの取得に失敗しました");
  }
  return response.json();
};

export const getTodoUrl = (statusFilter: StatusFilter) => {
  const queryParam = statusFilter === "all" ? "" : `status=${statusFilter}`;
  return `${BASE_URL}/${queryParam ? "?" + queryParam : ""}`;
};
