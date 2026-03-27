import { Avatar, AvatarFallback, AvatarImage, Text } from "#ui";
import { FC } from "react";

interface ProjectAvatarProps {
  image?: string;
  name: string;
}

export const ProjectAvatar: FC<ProjectAvatarProps> = ({ image, name }) => {
  const letter = name.slice(0, 1).toLocaleUpperCase();
  return (
    <>
      {image ? (
        <Avatar size="lg">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      ) : (
        <div className="bg-muted/70 flex size-10 items-center justify-center border tracking-wider">
          <Text variant={"large"}>{letter}</Text>
        </div>
      )}
    </>
  );
};
