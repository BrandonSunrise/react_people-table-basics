import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPeople } from '../api';
import { Loader } from '../components/Loader';
import { PeopleTable } from '../components/PeopleTable';
import { Person } from '../types';

export const PeoplePage: React.FC = () => {
  const { personSlug = '' } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  const isTableVisible = isFetched && people.length;
  const isTableEmpty = isFetched && !people.length;

  const fetchPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const responsePeople = await getPeople();

      setPeople(responsePeople);
      setIsFetched(true);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="container">
      <h1 className="title">People Page</h1>

      <div className="block">
        <div className="box table-container">
          {isLoading && <Loader />}

          {isTableEmpty && (
            <p data-cy="noPeopleMessage">
              There are no people on the server
            </p>
          )}

          {hasError && (
            <p data-cy="peopleLoadingError" className="has-text-danger">
              Something went wrong
            </p>
          )}

          {isTableVisible && (
            <PeopleTable
              people={people}
              personSlug={personSlug}
            />
          )}
        </div>
      </div>
    </div>
  );
};