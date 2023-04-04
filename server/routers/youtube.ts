import { TRPCError } from "@trpc/server";
import { youtube_v3 } from "googleapis";

import { procedure, router } from "../trpc";

export const youtubeRouter = router({
  getUploads: procedure.query(async () => {
    const channelApi = new youtube_v3.Resource$Channels({
      _options: { auth: process.env.YT_KEY },
    });

    const channelResult = await channelApi.list({
      part: ["snippet", "contentDetails", "statistics", "contentDetails"],
      id: ["UCgC_LeRCS-nnpZm8c6g53Qw"],
    });

    const uploadsPlaylist =
      channelResult.data.items?.[0].contentDetails?.relatedPlaylists?.uploads;

    if (!uploadsPlaylist) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "No uploads playlist found",
      });
    }

    const playlistItemsApi = new youtube_v3.Resource$Playlistitems({
      _options: { auth: process.env.YT_KEY },
    });

    const playlistItemsResult = await playlistItemsApi.list({
      part: ["snippet", "contentDetails", "status"],
      playlistId: uploadsPlaylist,
    });

    return playlistItemsResult.data;
  }),
});
