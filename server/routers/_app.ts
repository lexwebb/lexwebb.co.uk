import { router } from "../trpc";
import { youtubeRouter } from "./youtube";

export const appRouter = router({
  youtube: youtubeRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
