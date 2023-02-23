import React from 'react';
import classNames from 'classnames';
import { Person } from '../../types';
import { PersonLink } from '../PersonLink';

type Props = {
  people: Person[],
  personSlug: string,
};

export const PeopleTable: React.FC<Props> = ({ people, personSlug }) => {
  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Sex</th>
          <th>Born</th>
          <th>Died</th>
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => {
          const {
            sex,
            born,
            died,
            fatherName,
            motherName,
            slug,
          } = person;

          const isSelected = slug === personSlug;
          const mother = people.find(mom => mom.name === motherName);
          const father = people.find(dad => dad.name === fatherName);

          return (
            <tr
              data-cy="person"
              key={slug}
              className={classNames({ 'has-background-warning': isSelected })}
            >
              <td>
                <PersonLink person={person} />
              </td>

              <td>{sex}</td>
              <td>{born}</td>
              <td>{died}</td>

              <td>
                {!mother ? (motherName || '-') : <PersonLink person={mother} />}
              </td>

              <td>
                {!father ? (fatherName || '-') : <PersonLink person={father} />}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};