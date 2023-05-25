import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRepositoryDetails } from "../../services/github-api.services";
import useRepositoryStore from "../../store/repositoryStore";
import LayoutWrapper from "../../components/LayoutWrapper";
import { StarIcon } from "@heroicons/react/24/outline";
import { FormattedMessage, useIntl } from "react-intl";
import RedirectButton from "../../components/RedirectButton";
import BackButton from "../../components/BackButton";
import LoadingSpinner from "../../components/LoadingSpinner";

const RepositoryDetails: React.FC = () => {
  const { owner, repositoryName } = useParams();
  const intl = useIntl();
  const { repository, updateRepository, setLoading, loading } =
    useRepositoryStore();

  useEffect(() => {
    const fetchRepositories = async () => {
      setLoading(true);

      try {
        const response = await getRepositoryDetails(owner!, repositoryName!);
        const repositoryData = response.data.data.repository;
        updateRepository(repositoryData);
      } catch (error) {
        console.error("Failed to fetch repositories.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [repositoryName]);

  return (
    <main className="mt-10">
      {!loading ? (
        <LayoutWrapper>
          <div className="space-y-10">
            <div className="w-full flex items-center justify-between">
              <BackButton />
              <RedirectButton className="py-3" url={repository?.url!}>
                <FormattedMessage id="GO_TO_GITHUB" />
              </RedirectButton>
            </div>
            <div className="relative lg:flex lg:justify-between space-y-5">
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <h1
                    className="text-xl font-bold"
                    aria-label={intl.formatMessage({ id: "REPOSITORY.NAME" })}
                    tabIndex={0}
                  >
                    {repository?.name}
                  </h1>
                  <div className="flex items-center space-x-1">
                    <StarIcon className="w-5 h-5" />
                    <p
                      aria-label={intl.formatMessage({
                        id: "REPOSITORY.STARS",
                      })}
                      tabIndex={0}
                    >
                      {repository?.stargazerCount}
                    </p>
                  </div>
                </div>
                <p
                  className="text-gray-600"
                  aria-label={intl.formatMessage({
                    id: "REPOSITORY.LAST_COMMIT",
                  })}
                  tabIndex={0}
                >
                  <FormattedMessage id="LAST_PUSH" />{" "}
                  {new Date(repository?.pushedAt!).toLocaleString()}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <img
                  className="h-10 h-10 rounded-full flex lg:hidden"
                  src={repository?.owner.avatarUrl}
                  alt="AVATAR"
                />
                <a
                  aria-label={intl.formatMessage({ id: "OWNER.NAME" })}
                  tabIndex={0}
                  className="font-medium"
                  href={repository?.owner.url}
                >
                  {repository?.owner.login}
                </a>
                <img
                  className="h-10 h-10 rounded-full hidden lg:flex"
                  src={repository?.owner.avatarUrl}
                  alt="AVATAR"
                />
              </div>
            </div>

            <div className="relative lg:flex lg:justify-between space-y-5">
              <div className="space-y-2 w-full">
                <h2 className="text-lg font-semibold">
                  <FormattedMessage id="DESCRIPTION" />
                </h2>
                {repository?.description ? (
                  <p
                    aria-label={intl.formatMessage({
                      id: "REPOSITORY.DESCRIPTION",
                    })}
                    tabIndex={0}
                  >
                    {repository?.description}
                  </p>
                ) : (
                  <p className="w-full text-center text-gray-400 py-10">
                    <FormattedMessage id="DESCRIPTION.NOT_LISTED" />
                  </p>
                )}
              </div>
              <div className="space-y-2 min-w-32 w-full md:w-1/5">
                <h2 className="text-lg font-semibold">
                  <FormattedMessage id="LANGUAGES" />
                </h2>
                {repository?.languages?.nodes?.length! > 0 ? (
                  <ul>
                    {repository?.languages?.nodes?.map((language) => (
                      <li
                        aria-label={intl.formatMessage({
                          id: "REPOSITORY.LANGUAGE",
                        })}
                        tabIndex={0}
                        key={language.id}
                      >
                        {language.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-gray-400 py-10">
                    <FormattedMessage id="LANGUAGES.NOT_LISTED" />
                  </p>
                )}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      ) : (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] ">
          <LoadingSpinner />
        </div>
      )}
    </main>
  );
};

export default RepositoryDetails;
