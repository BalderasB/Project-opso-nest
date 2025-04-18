import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolesGuard } from "../guards/roles.guard";
import { Roles } from "./roles.decorator";
import { AuthGuard } from "../guards/auth.guard";
import { ROLES } from "src/constants/roles.constants";

export const Auth = (...roles: ROLES[]) => {
    roles.push(ROLES.ADMIN);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    )

}
