import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {DirectoryDTO} from "../../../../common/entities/DirectoryDTO";
import {PhotoEntity} from "./PhotoEntity";

@Entity()
export class DirectoryEntity implements DirectoryDTO {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 500
  })
  name: string;

  @Column({
    length: 500
  })
  path: string;


  @Column('number')
  public lastModified: number;
  @Column('number')
  public lastScanned: number;

  @Column({type: 'smallint', length: 1})
  public scanned: boolean;

  @ManyToOne(type => DirectoryEntity, directory => directory.directories, {onDelete: "CASCADE"})
  public parent: DirectoryEntity;

  @OneToMany(type => DirectoryEntity, dir => dir.parent)
  public directories: Array<DirectoryEntity>;

  @OneToMany(type => PhotoEntity, photo => photo.directory)
  public photos: Array<PhotoEntity>;

}