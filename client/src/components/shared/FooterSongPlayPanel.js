import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FcLike } from "react-icons/fc";
import { BsPlayCircle } from "react-icons/bs";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { IoPlaySkipBackOutline } from "react-icons/io5";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { SlLoop } from "react-icons/sl";
import { LiaPauseSolid, LiaRandomSolid } from "react-icons/lia";
import { BsVolumeUp } from "react-icons/bs";
import { cards_data } from "../../utils/constant";
import Card from "../shared/Card";
import { Howl, Howler } from "howler";
import songContext from "../../contexts/SongContext";

const FooterSongPlayPanel = () => {
  const {
    currentSong,
    setCurrentSong,
    soundPlay,
    isPaused,
    setIsPaused,
    setSoundPlay,
  } = useContext(songContext);

  //const firstUpdate = useRef(false);

  //console.log(currentSong);

  useEffect(() => {
    // if (firstUpdate.current) {
    //   console.log(firstUpdate);
    //   firstUpdate.current = false;
    //   return;
    // }

    if (!currentSong) return;
    changeSong(currentSong.song);//pass object of whole song thts urrentsong.song
  }, [currentSong,currentSong.song]);

  const changeSong = (songSrc) => {
    //console.log("in change song",songSrc)
    if (soundPlay) {
      soundPlay.stop();
      setIsPaused(true);
    }
    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });
    setSoundPlay(sound);
    sound.play();
    setIsPaused(false);
    //console.log(sound)
  };
  const playSong = () => {
    if (!soundPlay) return;
    soundPlay.play();
  };
  const pauseSong = () => {
    soundPlay.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSong();
      setIsPaused(false);
    } else {
      pauseSong();
      setIsPaused(true);
    }
  };

  return (
    <div className="pl-10 pr-10 flex justify-between h-[10%] w-full bg-white/[0.15]">
      <div className="flex items-center">
        <div>
          <img
            style={{ height: "50px" }}
            className="rounded-lg"
            src={currentSong.thumbnail}
            alt=""
          />
        </div>
        <div className="ml-3">
          <div className="text-md font-semibold text-white/[0.80]">
            {currentSong.name}
          </div>
          <div className="text-sm font-semi-bold text-white/[0.75]">
            {currentSong?.artist?.name}
          </div>
        </div>
        <div>
          <FcLike className="ml-5" color="white" size={20} />
        </div>
      </div>
      <div className="flex flex-col h-full w-1/3 justify-center">
        <div className="flex justify-center items-center text-white group ">
          <div className="cursor hover:cursor-pointer mr-3">
            <LiaRandomSolid size={20} />
          </div>
          <div className="cursor hover:cursor-pointer mr-3">
            <IoPlaySkipBackOutline size={25} />
          </div>
          <div
            className="cursor hover:cursor-pointer mr-3"
            onClick={togglePlayPause}
          >
            {isPaused ? (
              <BsPlayCircle size={30} />
            ) : (
              <AiOutlinePauseCircle size={30} />
            )}
          </div>
          <div className="cursor hover:cursor-pointer mr-3">
            <IoPlaySkipForwardOutline size={25} />
          </div>
          <div className="cursor hover:cursor-pointer mr-3">
            <SlLoop size={20} />
          </div>
        </div>
        <div className="flex text-sm text-white justify-center items-center">
          <div className="p-1">0.4</div>
          <div className="w-[70%] border border-solid border-white"></div>
          <div className="p-1">3.55</div>
        </div>
      </div>
      <div className="flex items-center justify-end mr-5 w-[5%]">
        <BsVolumeUp size={20} color="white" />
        <div className="w-6 border border-solid border-white"></div>
      </div>
    </div>
  );
};

export default FooterSongPlayPanel;
