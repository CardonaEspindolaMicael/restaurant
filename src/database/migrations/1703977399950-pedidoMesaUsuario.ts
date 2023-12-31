import { MigrationInterface, QueryRunner } from "typeorm";

export class PedidoMesaUsuario1703977399950 implements MigrationInterface {
    name = 'PedidoMesaUsuario1703977399950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "mesa" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nro" integer NOT NULL, "estado" character varying(10) NOT NULL, "nrosillas" integer NOT NULL, CONSTRAINT "PK_1ddbc4791ca87a1032b5b759e99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pedido" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nro" integer NOT NULL, "estado" character varying NOT NULL, "total" double precision NOT NULL, "descuento" double precision NOT NULL, "detalle" character varying(256) NOT NULL, "fecha" date NOT NULL, "id_mesa" uuid NOT NULL, "id_usuario" uuid NOT NULL, CONSTRAINT "PK_af8d8b3d07fae559c37f56b3f43" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_940779eb5f4462bf3819c025260" FOREIGN KEY ("id_mesa") REFERENCES "mesa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pedido" ADD CONSTRAINT "FK_512f2a53c873366a90180938ee5" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_512f2a53c873366a90180938ee5"`);
        await queryRunner.query(`ALTER TABLE "pedido" DROP CONSTRAINT "FK_940779eb5f4462bf3819c025260"`);
        await queryRunner.query(`DROP TABLE "pedido"`);
        await queryRunner.query(`DROP TABLE "mesa"`);
    }

}
