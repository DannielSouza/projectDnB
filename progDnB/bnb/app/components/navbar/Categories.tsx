"use client";

import React from "react";
import Container from "../container/Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";

import CategoryBox from "../categoryBox/CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
  {
    label: "Praia",
    icon: TbBeach,
    description: "Propriedade perto ou na beira da praia!",
  },
  {
    label: "Morderna",
    icon: MdOutlineVilla,
    description: "Propriedade com estilo mais moderno!",
  },
  {
    label: "Interior",
    icon: TbMountain,
    description: "Esta propriedade fica no interior!",
  },
  {
    label: "Piscina",
    icon: TbPool,
    description: "Esta propriedade possui uma bela piscina!",
  },
  {
    label: "Ilha",
    icon: GiIsland,
    description: "Esta propriedade fica em uma ilha!",
  },
  {
    label: "Lago",
    icon: GiBoatFishing,
    description: "Esta propriedade fica perto de um lago!",
  },
  {
    label: "Sky",
    icon: FaSkiing,
    description: "Esta propriedade fica perto de um lugar de sky!",
  },
  {
    label: "Castelo",
    icon: GiCastle,
    description: "Esta propriedade é um antigo castelo!",
  },
  {
    label: "Caverna",
    icon: GiCaveEntrance,
    description: "Esta propriedade fica em uma caverna assustadora!",
  },
  {
    label: "Campo",
    icon: GiForestCamp,
    description: "Esta propriedade oferece atividades de campo!",
  },
  {
    label: "Ártico",
    icon: BsSnow,
    description: "Esta propriedade está no ambiente ártico!",
  },
  {
    label: "Deserto",
    icon: GiCactus,
    description: "Esta propriedade está em um deserto!",
  },
  {
    label: "Celeiro",
    icon: GiBarn,
    description: "Esta propriedade está em um celeiro!",
  },
  {
    label: "Luxo",
    icon: IoDiamond,
    description: "Esta propriedade é nova e luxuosa!",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const pathName = usePathname();

  const currentCategory = params?.get("category");
  const isMainPage = pathName === "/";

  if (!isMainPage) return null;

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => {
          return (
            <CategoryBox
              key={category.label}
              label={category.label}
              selected={currentCategory === category.label}
              icon={category.icon}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
