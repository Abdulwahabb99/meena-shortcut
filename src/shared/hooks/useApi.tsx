import { useCallback } from "react";
import API from "shared/functions/axios";

export function useApi() {
  const get = useCallback(async (url, config = {}) => {
    try {
      const res = await API.get(url, config);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const post = useCallback(async (url, data = {}, config = {}) => {
    try {
      const res = await API.post(url, data, config);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const put = useCallback(async (url, data = {}, config = {}) => {
    try {
      const res = await API.put(url, data, config);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  const del = useCallback(async (url, config = {}) => {
    try {
      const res = await API.delete(url, config);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }, []);

  return { get, post, put, del };
}
