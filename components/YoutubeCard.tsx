import { youtube_v3 } from "googleapis";
import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { AiOutlineYoutube } from "react-icons/ai";
import { TiArrowRightThick } from "react-icons/ti";

import Button from "./Button";
import styles from "./ListItemCard.module.scss";
import Typography from "./Typography";

type Props = {
  video?: youtube_v3.Schema$PlaylistItem;
};

const YoutubeCard: React.FC<Props> = ({ video }) => {
  return (
    <Link
      href={`https://www.youtube.com/watch?v=${video?.contentDetails?.videoId}`}
      className={styles.cardLink}
    >
      <Button>
        <div>
          <div className={styles.title}>
            <AiOutlineYoutube />
            <Typography as="h1" size="medium">
              {video?.snippet?.title}
            </Typography>
          </div>
          <div className={styles.thumbText}>
            {video?.snippet?.thumbnails?.high?.url && (
              <Image
                src={video?.snippet?.thumbnails?.high?.url}
                alt="Thumbnail"
                layout="intrinsic"
                width={480}
                height={360}
              />
            )}
            <Typography as="p" size="small" weight="regular">
              {video?.snippet?.description}
            </Typography>
          </div>
        </div>
        <TiArrowRightThick />
      </Button>
    </Link>
  );
};

export default YoutubeCard;
