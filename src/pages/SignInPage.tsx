import { SignInForm } from '@medplum/react';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../components/Footer';
import { MEDPLUM_GOOGLE_CLIENT_ID, MEDPLUM_PROJECT_ID } from '../config';
export function SignInPage(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div id="signin" className="flex h-screen flex-col justify-between">
      <main>
        <div className="relative bg-white">
          <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover lg:absolute lg:h-full"
                src="https://img.freepik.com/vector-premium/mujeres-jovenes-que-hacen-posturas-yoga-muestran-su-fuerza-muscular-traves-ejercicio-cuidado-salud-vector-ilustracion-dibujos-animados-estilo-plano_610956-644.jpg"
                alt="PASOS Bienestar Ingresar"
              />
            </div>
          </div>
          <div className="relative py-16 px-4 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col justify-between lg:pr-8">
              <SignInForm
                projectId={MEDPLUM_PROJECT_ID}
          googleClientId={MEDPLUM_GOOGLE_CLIENT_ID}
          onSuccess={() => navigate('/')}
              >
                <h2>PASOS</h2>
              </SignInForm>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
