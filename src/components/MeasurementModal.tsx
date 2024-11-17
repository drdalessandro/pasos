import { Fragment, useState } from 'react';
import { useMedplum } from '@medplum/react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import getMeasurementObject from '../helpers/get-measurement-object';
import { Patient, Reference } from '@medplum/fhirtypes';

interface MeasurementModalProps {
  subject: Reference<Patient>;
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

interface MeasurementValues {
  altura: string;
  peso: string;
  cintura: string;
  presiónArterialDiastólica: string;
  presiónArterialSistólica: string;
  frecuenciaCardíaca: string;
  frecuenciaRespiratoria: string;
  saturaciónOxígeno: string;
  temperaturaAxilar: string;
  duraciónSueño: string;
  duraciónEjercicio: string;
  duraciónPeríodo: string;
}

interface measurementModalInputTypes {
  modalType: string;
  inputType: string;
  value: string;
  name: string;
  placeholder: string;
}

export default function MeasurementModal({ subject, type, isOpen, onClose }: MeasurementModalProps): JSX.Element {
  const medplum = useMedplum();

  const [modalValues, setModalValues] = useState<MeasurementValues>({
    altura: '',
    peso: '',
    cintura: '',
    presiónArterialDiastólica: '',
    presiónArterialSistólica: '',
    frecuenciaCardíaca: '',
    frecuenciaRespiratoria: '',
    saturaciónOxígeno: '',
    temperaturaAxilar: '',
    duraciónSueño: '',
    duraciónEjercicio: '',
    duraciónPeríodo: '',
  });

  const handleInputChange = (key: string, value: string): void => {
    setModalValues({ ...modalValues, [key]: value });
  };

  const createMeasurement = (firstValue: string, secondValue?: string): void => {
    medplum
      .createResource(getMeasurementObject(subject, type, firstValue, secondValue))
      .then(() => onClose())
      .catch((err) => console.error(err));
  };

  const addResource = (): void => {
    if (type === 'Presión Arterial' && modalValues.presiónArterialDiastólica && modalValues.presiónArterialSistólica) {
      createMeasurement(modalValues.presiónArterialDiastólica, modalValues.presiónArterialSistólica);
    } else if (type === 'Temperatura Axilar' && modalValues.temperaturaAxilar) {
      createMeasurement(modalValues.temperaturaAxilar);
    } else if (type === 'Altura' && modalValues.altura) {
      createMeasurement(modalValues.altura);
    } else if (type === 'Circunferencia Abdominal' && modalValues.cintura) {
      createMeasurement(modalValues.cintura);
    } else if (type === 'Frecuencia Respiratoria' && modalValues.frecuenciaRespiratoria) {
      createMeasurement(modalValues.frecuenciaRespiratoria);
    } else if (type === 'Saturación Oxígeno' && modalValues.saturaciónOxígeno) {
      createMeasurement(modalValues.saturaciónOxígeno);
    } else if (type === 'Frecuencia Cardíaca' && modalValues.frecuenciaCardíaca) {
      createMeasurement(modalValues.frecuenciaCardíaca);
    } else if (type === 'Peso' && modalValues.peso) {
      createMeasurement(modalValues.peso);
    } else if (type === 'Duración Sueño' && modalValues.duraciónSueño) {
      createMeasurement(modalValues.duraciónSueño);
    } else if (type === 'Duración Ejercicio' && modalValues.duraciónEjercicio) {
      createMeasurement(modalValues.duraciónEjercicio);
    } else if (type === 'Duración Período' && modalValues.duraciónPeríodo) {
      createMeasurement(modalValues.duraciónPeríodo);
    }
  };

  const measurementModalInputs: measurementModalInputTypes[] = [
    {
      modalType: 'Presión Arterial',
      inputType: 'number',
      value: modalValues.presiónArterialSistólica,
      name: 'presiónArterialSistólica',
      placeholder: 'mm[Hg]',
    },
    {
      modalType: 'Presión Arterial',
      inputType: 'number',
      value: modalValues.presiónArterialDiastólica,
      name: 'presiónArterialDiastólica',
      placeholder: 'mm[Hg]',
    },
    {
      modalType: 'Temperatura Axilar',
      inputType: 'number',
      value: modalValues.temperaturaAxilar,
      name: 'temperaturaAxilar',
      placeholder: '°C',
    },
    {
      modalType: 'Altura',
      inputType: 'number',
      value: modalValues.altura,
      name: 'altura',
      placeholder: 'cm',
    },
    {
      modalType: 'Frecuencia Respiratoria',
      inputType: 'number',
      value: modalValues.frecuenciaRespiratoria,
      name: 'frecuenciaRespiratoria',
      placeholder: '/min',
    },
    {
      modalType: 'Saturación Oxígeno',
      inputType: 'number',
      value: modalValues.saturaciónOxígeno,
      name: 'saturaciónOxígeno',
      placeholder: '/%',
    },
    {
      modalType: 'Frecuencia Cardíaca',
      inputType: 'number',
      value: modalValues.frecuenciaCardíaca,
      name: 'frecuenciaCardíaca',
      placeholder: '/min',
    },
    {
      modalType: 'Peso',
      inputType: 'number',
      value: modalValues.peso,
      name: 'peso',
      placeholder: 'kg',
    },
    {
      modalType: 'Circunferencia Abdominal',
      inputType: 'number',
      value: modalValues.cintura,
      name: 'cintura',
      placeholder: 'Cm',
    },
    {
      modalType: 'Duración Sueño',
      inputType: 'number',
      value: modalValues.duraciónSueño,
      name: 'duraciónSueño',
      placeholder: 'Hs',
    },
    {
      modalType: 'Duración Ejercicio',
      inputType: 'number',
      value: modalValues.duraciónEjercicio,
      name: 'duraciónEjercicio',
      placeholder: 'Min',
    },
    {
      modalType: 'Duración Período',
      inputType: 'number',
      value: modalValues.duraciónPeríodo,
      name: 'duraciónPeríodo',
      placeholder: 'Días',
    },
  ];

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {type}
                  </Dialog.Title>
                  <div className="mt-2 flex space-x-4">
                    {measurementModalInputs
                      .filter(({ modalType }) => modalType === type)
                      .map(({ inputType, name, value, placeholder }) => (
                        <div className="flex w-full flex-col space-y-2" key={name}>
                          <p className="text-base capitalize text-gray-600">{name.split(/(?=[A-Z])/).join(' ')}</p>
                          <Input
                            type={inputType}
                            value={value}
                            name={name}
                            handleChange={handleInputChange}
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={addResource}
                  >
                    Agregar</button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={onClose}
                  >
                    Cancelar</button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
