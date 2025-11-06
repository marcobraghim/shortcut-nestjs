import { PrimaryColumn, Column, Entity } from "typeorm";

@Entity('url')
export class UrlEntity {

  @PrimaryColumn()
  shortcode: string;

  @Column()
  target_url: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
