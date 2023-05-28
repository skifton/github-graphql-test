import React from "react";
import RepositoryCard from "./RepositoryCard";
import { IRepository } from "../../models/repository.model";

interface IProps {
  repositories: IRepository[];
  selectRepository: (owner: string, name: string) => void;
}

const RepositoryList: React.FC<IProps> = ({
  repositories,
  selectRepository,
}) => {
  return (
    <div className="py-10">
      <ul className="space-y-4">
        {repositories.map((repo) => (
          <li key={repo.id}>
            <RepositoryCard
              repository={repo}
              selectRepository={selectRepository}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
