import { MigrationInterface, QueryRunner } from "typeorm";

export class RolControllerAndInsumos1703953263258 implements MigrationInterface {
    name = 'RolControllerAndInsumos1703953263258'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "insumo" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(256) NOT NULL, "cantidad" double precision NOT NULL, "descripcion" character varying(256), "fecha" date NOT NULL, "id_usuario" uuid NOT NULL, CONSTRAINT "PK_5d2039ce43d4611cfaf0a04f879" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(256) NOT NULL, "nombre" character varying(256) NOT NULL, "contrasena" character varying(256) NOT NULL, "fechanacimiento" date NOT NULL, "genero" character NOT NULL, "email" character varying(256), "imagen" character varying DEFAULT 'https://cdn-icons-png.flaticon.com/512/3282/3282224.png', "id_rol" uuid NOT NULL, CONSTRAINT "UQ_6ccff37176a6978449a99c82e10" UNIQUE ("username"), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cargo" character varying(256) NOT NULL, "descripcion" character varying(256) NOT NULL, CONSTRAINT "PK_c93a22388638fac311781c7f2dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "permiso" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nombre" character varying(60) NOT NULL, "descripcion" character varying(256), CONSTRAINT "PK_8f675309c577bd8f4d826994e95" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rol_Permiso" ("id_rol" uuid NOT NULL, "id_permiso" uuid NOT NULL, CONSTRAINT "PK_cf97dd6e28cd1c70f5d38ad0c7e" PRIMARY KEY ("id_rol", "id_permiso"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f950f9c167b6eb3400ce7705dc" ON "rol_Permiso" ("id_rol") `);
        await queryRunner.query(`CREATE INDEX "IDX_5475600785f354ea532979ec8a" ON "rol_Permiso" ("id_permiso") `);
        await queryRunner.query(`ALTER TABLE "insumo" ADD CONSTRAINT "FK_60b01ea6a158486792875e1d18d" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario" ADD CONSTRAINT "FK_3628e9894c4b014d61a01cb21dd" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rol_Permiso" ADD CONSTRAINT "FK_f950f9c167b6eb3400ce7705dcb" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rol_Permiso" ADD CONSTRAINT "FK_5475600785f354ea532979ec8a7" FOREIGN KEY ("id_permiso") REFERENCES "permiso"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rol_Permiso" DROP CONSTRAINT "FK_5475600785f354ea532979ec8a7"`);
        await queryRunner.query(`ALTER TABLE "rol_Permiso" DROP CONSTRAINT "FK_f950f9c167b6eb3400ce7705dcb"`);
        await queryRunner.query(`ALTER TABLE "usuario" DROP CONSTRAINT "FK_3628e9894c4b014d61a01cb21dd"`);
        await queryRunner.query(`ALTER TABLE "insumo" DROP CONSTRAINT "FK_60b01ea6a158486792875e1d18d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5475600785f354ea532979ec8a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f950f9c167b6eb3400ce7705dc"`);
        await queryRunner.query(`DROP TABLE "rol_Permiso"`);
        await queryRunner.query(`DROP TABLE "permiso"`);
        await queryRunner.query(`DROP TABLE "rol"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
        await queryRunner.query(`DROP TABLE "insumo"`);
    }

}
