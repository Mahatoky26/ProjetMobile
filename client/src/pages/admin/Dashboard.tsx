import { IonContent, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import React from "react";
import Chart from "../../assets/Chart";
import { Card, Title, DonutChart, Subtitle, BarChart } from "@tremor/react";

const Dashboard = () => {
  const chartdata = [
    {
      name: "Amphibians",
      Number: 2488,
    },
    {
      name: "Birds",
      Number: 1445,
    },
    {
      name: "Crustaceans",
      Number: 743,
    },
  ];

  const dataFormatter = (number: number) => {
    return " " + Intl.NumberFormat("us").format(number).toString();
  };

  return (
    <div className="apple lg:col-span-7  h-full overflow-y-scroll">
      <IonToolbar className="text-2xl lg:text-4xl text-center uppercase">
        <IonTitle className="tracking-widest">
          <div className="titre font-bold flex justify-center gap-4">
            <Chart />
            Tableaux de bord
          </div>
        </IonTitle>
      </IonToolbar>
      <div className="lg:grid lg:grid-cols-3 justify-center flex flex-col gap-4 lg:gap-16 p-8">
        <Card className="w-full bg-gray-400 rounded-lg">
          <Title>Nombre total de vente</Title>
          <Subtitle>
            
          </Subtitle>
          <BarChart
            className="mt-6"
            data={chartdata}
            index="name"
            categories={["Number"]}
            colors={["#111111"]}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
          />
        </Card>
        <Card className="w-full bg-gray-400 rounded-lg">
            <Title>Nombre total d'achat</Title>
            <Subtitle>
              
            </Subtitle>
            <BarChart
              className="mt-6"
              data={chartdata}
              index="name"
              categories={["Number"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </Card>
          <Card className="w-full bg-gray-400 rounded-lg">
            <Title>Chiffre d'affaires, total dépense</Title>
            <Subtitle>
              
            </Subtitle>
            <BarChart
              className="mt-6"
              data={chartdata}
              index="name"
              categories={["Number"]}
              colors={["blue"]}
              valueFormatter={dataFormatter}
              yAxisWidth={48}
            />
          </Card>
      </div>
    </div>
  );
};

export default Dashboard;
