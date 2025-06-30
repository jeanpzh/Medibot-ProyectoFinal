import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Globe, Info } from "lucide-react";

const ImpactCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-3 text-sm">{children}</CardContent>
  </Card>
);

export const GlobalImpactTab = () => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-primary" />
        Impacto Global
      </CardTitle>
      <CardDescription>
        Información sobre el impacto mundial de la pandemia COVID-19
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <Alert className="bg-primary/5 border-primary/20">
          <Info className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary/80">
            <strong>Nota:</strong> Los datos globales sobre COVID-19 cambian
            constantemente. Esta información proporciona una visión general del
            impacto de la pandemia.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImpactCard title="Impacto en la Salud">
            <p>
              La pandemia de COVID-19 ha tenido un impacto sin precedentes en
              los sistemas de salud globales, causando millones de infecciones y
              muertes en todo el mundo.
            </p>
            <p>
              Además de los efectos directos del virus, la pandemia ha provocado
              interrupciones en servicios de salud esenciales, retrasos en
              tratamientos para otras condiciones médicas y un aumento en
              problemas de salud mental.
            </p>
          </ImpactCard>

          <ImpactCard title="Impacto Socioeconómico">
            <p>
              Las medidas para contener la propagación del virus, como
              confinamientos y restricciones de viaje, han tenido profundos
              efectos económicos.
            </p>
            <p>
              La pandemia ha exacerbado las desigualdades existentes, afectando
              desproporcionadamente a comunidades vulnerables y países de bajos
              ingresos.
            </p>
          </ImpactCard>

          <ImpactCard title="Respuesta Global">
            <p>
              La colaboración científica internacional ha sido sin precedentes,
              resultando en el desarrollo rápido de pruebas diagnósticas,
              tratamientos y vacunas.
            </p>
            <p>
              Iniciativas como COVAX han trabajado para garantizar un acceso
              equitativo a las vacunas, aunque persisten desafíos.
            </p>
          </ImpactCard>

          <ImpactCard title="Lecciones Aprendidas">
            <p>
              La importancia de sistemas de salud pública robustos y la
              preparación para pandemias ha sido destacada como una prioridad
              global.
            </p>
            <p>
              La comunicación clara y basada en evidencia es crucial para
              combatir la desinformación.
            </p>
          </ImpactCard>
        </div>
      </div>
    </CardContent>
  </Card>
);
