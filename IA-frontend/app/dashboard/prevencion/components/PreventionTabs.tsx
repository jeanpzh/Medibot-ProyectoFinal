import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Home, AlertTriangle, Heart, CheckCircle } from "lucide-react";
import { PreventionCard } from "./PreventionCard";
import {
  basicPrevention,
  advancedPrevention,
  vaccinationInfo,
  highRiskFactors,
} from "../constants";

export const PreventionTabs = () => (
  <Tabs defaultValue="basic" className="w-full">
    <TabsList className="grid grid-cols-4 mb-6">
      <TabsTrigger value="basic" className="gap-2">
        <Shield className="h-4 w-4" />
        <span className="hidden sm:inline">Básico</span>
      </TabsTrigger>
      <TabsTrigger value="advanced" className="gap-2">
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Avanzado</span>
      </TabsTrigger>
      <TabsTrigger value="vaccination" className="gap-2">
        <Heart className="h-4 w-4" />
        <span className="hidden sm:inline">Vacunación</span>
      </TabsTrigger>
      <TabsTrigger value="risk" className="gap-2">
        <AlertTriangle className="h-4 w-4" />
        <span className="hidden sm:inline">Alto Riesgo</span>
      </TabsTrigger>
    </TabsList>

    <TabsContent value="basic">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {basicPrevention.map((item) => (
          <PreventionCard key={item.title} {...item} />
        ))}
      </div>
    </TabsContent>

    <TabsContent value="advanced">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {advancedPrevention.map((item) => (
          <PreventionCard key={item.title} {...item} />
        ))}
      </div>
    </TabsContent>

    <TabsContent value="vaccination">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
            <Heart className="h-5 w-5" />
            Importancia de la Vacunación
          </CardTitle>
          <CardDescription>
            Las vacunas son una herramienta clave en la lucha contra el
            COVID-19.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {vaccinationInfo.map((info, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TabsContent>

    <TabsContent value="risk">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <AlertTriangle className="h-5 w-5" />
            Grupos de Alto Riesgo
          </CardTitle>
          <CardDescription>
            Personas con estas condiciones deben tener precauciones adicionales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Consulte a su médico si pertenece a uno de estos grupos.
            </AlertDescription>
          </Alert>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {highRiskFactors.map((factor, index) => (
              <li key={index} className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <span>{factor}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
);
