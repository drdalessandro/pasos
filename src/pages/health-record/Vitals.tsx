import { getReferenceString } from '@medplum/core';
import { Patient } from '@medplum/fhirtypes';
import { useMedplum } from '@medplum/react';
import GridCell from '../../components/GridCell';
import GridSection from '../../components/GridSection';
import NoData from '../../components/NoData';
import PageTitle from '../../components/PageTitle';
import getLocaleDate from '../../helpers/get-locale-date';
import renderValue from '../../helpers/get-render-value';

const headers = ['Medición', 'Valor', 'Ultima actualización'];

export default function Vitals(): JSX.Element {
  const medplum = useMedplum();
  const patient = medplum.getProfile() as Patient;
  const bundle = medplum.search('Observation', 'patient=' + getReferenceString(patient)).read();

  return (
    <>
      <PageTitle title="Vitales" />
      {bundle.entry?.length ? (
        <GridSection array={headers}>
          <ul role="list" className="divide-y divide-gray-200 border-b-2  border-solid border-gray-200">
            {bundle.entry.map(({ resource }) => (
              <li key={resource?.meta?.lastUpdated}>
                {resource && resource?.code?.coding && resource?.meta?.lastUpdated && (
                  <a href="#" className="block hover:bg-gray-50">
                    <div className="flex items-center py-4">
                      <div className="flex min-w-0 flex-1 items-center">
                        <div className="grid min-w-0 flex-1 grid-cols-3">
                          <GridCell item={resource?.code?.coding[0].display} color="yellow" />
                          <GridCell item={renderValue(resource)} color="gray" />
                          <GridCell item={getLocaleDate(resource?.meta?.lastUpdated)} color="gray" />
                        </div>
                      </div>
                    </div>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </GridSection>
      ) : (
        <NoData title="vitales" />
      )}
    </>
  );
}
