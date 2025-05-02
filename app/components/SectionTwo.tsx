import Image from "next/image";
import square from "../../public/square.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import sketch from "../../public/tech-icons/sketch.svg";
import canva from "../../public/tech-icons/canva.svg";
import ai from "../../public/tech-icons/ai.svg";
import figma from "../../public/tech-icons/figma.svg";
import chatgpt from "../../public/tech-icons/chatgpt.svg";
import cloud from "../../public/tech-icons/creativecloud.svg";
import framer from "../../public/tech-icons/framer.svg";
import github from "../../public/tech-icons/github.svg";
import slack from "../../public/tech-icons/slack.svg";
import discord from "../../public/tech-icons/discord.svg";
import youtube from "../../public/tech-icons/youtube.svg";
import chrome from "../../public/tech-icons/chrome.svg";
import pr from "../../public/tech-icons/pr.svg";
import ps from "../../public/tech-icons/ps.svg";
import notion from "../../public/tech-icons/notion.svg";
import micro from "../../public/tech-icons/micro.svg";
import twitter from "../../public/twitter.svg";
import insta from "../../public/insta.svg";
import facebook from "../../public/facebook.svg";
import tiktok from "../../public/tiktok.svg";
import { Button } from "@/components/ui/button";

const icons = [
  sketch,
  canva,
  ai,
  figma,
  chatgpt,
  cloud,
  framer,
  github,
  slack,
  discord,
  youtube,
  chrome,
  pr,
  ps,
  notion,
  micro,
  facebook,
  tiktok,
];

const socialMedia = [
  {
    id: 1,
    icon: github,
    name: "Github",
    username: "Vert San",
    link: "https://github.com/itsanvert",
  },
  {
    id: 2,
    icon: facebook,
    name: "Facebook",
    username: "Vert San",
    link: "https://web.facebook.com/profile.php?id=61574843070322",
  },
  {
    id: 3,
    icon: tiktok,
    name: "Vert San",
    username: "Vert San",
    link: "http://localhost:3000/",
  },
];
export function SectionTwo() {
  return (
    <div className="grid gird-cols-1 lg:grid-cols-3 gap-4 mt-10">
      <div className="w-full relative col-span-1">
        <Image
          src={square}
          alt="square"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full col-span-1 lg:col-span-2 gap-4">
        <Card className="bg-muted border-none">
          <CardHeader>
            <CardTitle className="text-foreground">Explore my stack</CardTitle>
            <CardDescription className="text-muted-foreground">
              Check out the tools i use daily
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {icons.map((item, index) => (
              <div
                key={index}
                className="p-2 rounded-lg bg-background/50 backdrop-blur-sm"
              >
                <Image src={item} alt="Icon" className="w-16 h-16" />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4">
          {socialMedia.map((item) => (
            <Card
              key={item.id}
              className="p-4 flex flex-col items-center sm:items-start bg-muted border-none hover:bg-muted/80 transition-colors"
            >
              <div className="p-2 rounded-lg bg-background/50 backdrop-blur-sm">
                <Image src={item.icon} alt="Icon" className="w-16 h-16" />
              </div>
              <h1 className="text-2xl font-medium pt-3 text-foreground">
                {item.name}
              </h1>
              <p className="text-muted-foreground">{item.username}</p>
              <Button
                className="mt-4 bg-primary hover:bg-primary/90"
                size="sm"
                asChild
              >
                <a href={item.link}>Follow</a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
