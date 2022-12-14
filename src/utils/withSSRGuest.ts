import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export function withSSRGuest(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);
    if (cookies["@next-token"]) {
      return {
        redirect: {
          destination: "/admin/home",
          permanent: false,
        },
      };
    }

    return await fn(ctx)
  }
}
