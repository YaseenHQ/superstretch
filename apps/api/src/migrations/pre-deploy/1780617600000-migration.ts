/*
 * Copyright Daytona Platforms Inc.
 * SPDX-License-Identifier: AGPL-3.0
 */

import { MigrationInterface, QueryRunner } from 'typeorm'

export class Migration1780617600000 implements MigrationInterface {
  name = 'Migration1780617600000'

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Before this column existed the proxy always showed the preview warning, so
    // backfill existing organizations with `true` to preserve that behavior.
    await queryRunner.query(`ALTER TABLE "organization" ADD "preview_warning_enabled" boolean NOT NULL DEFAULT true`)
    // New organizations get their value explicitly from the service/config; align
    // the column default with the entity default (false) for any raw inserts.
    await queryRunner.query(`ALTER TABLE "organization" ALTER COLUMN "preview_warning_enabled" SET DEFAULT false`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "organization" DROP COLUMN "preview_warning_enabled"`)
  }
}
