import { Button, InputGroup, InputGroupAddon, InputGroupInput } from "#ui";
import { Plus, Search } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

interface ProjectsFiltersProps {
  searchValue: string;
  setSeachValue: Dispatch<SetStateAction<string>>;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ProjectsFilters: FC<ProjectsFiltersProps> = ({
  searchValue,
  setSeachValue,
  setShowModal,
  showModal,
}) => {
  return (
    <div className="flex w-full gap-4">
      <InputGroup className="w-full">
        <InputGroupInput
          placeholder="Введите название проекта"
          value={searchValue}
          onChange={(event) => setSeachValue(event.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <Button onClick={() => setShowModal(!showModal)}>
        <Plus /> Добавить проект
      </Button>
    </div>
  );
};
