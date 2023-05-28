import React from "react";
import { IRepository } from "../../models/repository.model";
import { StarIcon } from "@heroicons/react/24/outline";
import { FormattedMessage, useIntl } from "react-intl";
import RedirectButton from "../../components/RedirectButton";

interface IProps {
  repository: IRepository;
  selectRepository: (owner: string, name: string) => void;
}

const RepositoryCard: React.FC<IProps> = ({ repository, selectRepository }) => {
  const intl = useIntl();

  return (
    <div
      className="border border-gray-800 rounded-md p-3 flex justify-between"
      aria-label={intl.formatMessage({ id: "REPOSITORY" })}
      tabIndex={0}
    >
      <div className="space-y-2">
        <div className="flex items-center w-44 lg:w-full">
          <p
            className="font-bold mr-4 truncate hover:cursor-pointer"
            aria-label={intl.formatMessage({ id: "REPOSITORY.NAME" })}
            tabIndex={0}
            onClick={() =>
              selectRepository(repository.owner.login, repository.name)
            }
          >
            {repository.name}
          </p>
          <StarIcon className="w-5 h-5" />
          <p
            aria-label={intl.formatMessage({ id: "REPOSITORY.STARS" })}
            tabIndex={0}
          >
            {repository.stargazers?.totalCount}
          </p>
        </div>
        <p
          aria-label={intl.formatMessage({ id: "REPOSITORY.LAST_COMMIT" })}
          tabIndex={0}
          className="text-gray-800 font-thin"
        >
          <FormattedMessage id="LAST_PUSH" />{" "}
          {new Date(repository.pushedAt).toLocaleString()}
        </p>
      </div>
      <RedirectButton url={repository.url}>
        <FormattedMessage id="LINK.VIEW_ON_GITHUB" />
      </RedirectButton>
    </div>
  );
};

export default RepositoryCard;
