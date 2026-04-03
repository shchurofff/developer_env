import { Button, InputGroup, InputGroupAddon, InputGroupInput } from "#ui";
import { Plus, Search } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

interface ProjectsFiltersProps {
  searchValue: string;
  setSeachValue: Dispatch<SetStateAction<string>>;
  onCreate: () => void;
}

export const ProjectsFilters: FC<ProjectsFiltersProps> = ({
  searchValue,
  setSeachValue,
  onCreate,
}) => {
  return (
    <div className="bg-background/80 flex w-full flex-col gap-3 border p-3 sm:flex-row sm:items-center">
      <InputGroup className="w-full">
        <InputGroupInput
          placeholder="Найти проект по названию"
          value={searchValue}
          onChange={(event) => setSeachValue(event.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <Button onClick={() => onCreate()} className="sm:shrink-0">
        <Plus /> Добавить проект
      </Button>
    </div>
  );
};
