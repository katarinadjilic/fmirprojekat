import { DelatnostController } from "./controller/DelatnostController";
import { StamparijaController } from "./controller/StamparijaController";
import { ProizvodController } from "./controller/ProizvodController";
import { Banka } from "./entity/Banka";
import { BankaController } from "./controller/BankaController";
import { AdresaController } from "./controller/AdresaController";
import { ProfakturaStamparijeController } from "./controller/ProfakturaController";

export const Routes = [{
    method: "get",
    route: "/stamparija",
    controller: StamparijaController,
    action: "all"
}, {
    method: "get",
    route: "/stamparija/:id",
    controller: StamparijaController,
    action: "one"
}, {
    method: "post",
    route: "/stamparija",
    controller: StamparijaController,
    action: "insert"
}, {
    method: "delete",
    route: "/stamparija/:id",
    controller: StamparijaController,
    action: "remove"
}, {
    method: "patch",
    route: "/stamparija/:id",
    controller: StamparijaController,
    action: "update"
}, {
    method: "get",
    route: "/delatnost",
    controller: DelatnostController,
    action: "all"
}, {
    method: "get",
    route: "/proizvod",
    controller: ProizvodController,
    action: "all"
}, {
    method: "get",
    route: "/banka",
    controller: BankaController,
    action: "all"
}, {
    method: "get",
    route: "/adresa",
    controller: AdresaController,
    action: "all"
}, {
    method: "get",
    route: "/profakturaStamparije",
    controller: ProfakturaStamparijeController,
    action: "all"
}, {
    method: "get",
    route: "/profakturaStamparije/:id/stavke",
    controller: ProfakturaStamparijeController,
    action: "allStavke"
}, {
    method: "get",
    route: "/profakturaStamparije/:id",
    controller: ProfakturaStamparijeController,
    action: "one"
}, {
    method: "patch",
    route: "/profakturaStamparije/:id",
    controller: ProfakturaStamparijeController,
    action: "update"
}, {
    method: "delete",
    route: "/profakturaStamparije/:id",
    controller: ProfakturaStamparijeController,
    action: "remove"
}, {
    method: "post",
    route: "/profakturaStamparije",
    controller: ProfakturaStamparijeController,
    action: "insert"
}];