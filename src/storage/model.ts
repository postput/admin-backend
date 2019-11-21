import {
    AllowNull,
    AutoIncrement, BelongsTo,
    Column, CreatedAt,
    DataType, DeletedAt,
    ForeignKey,
    IsUUID,
    Model,
    PrimaryKey, Table,
    Unique, UpdatedAt
} from "sequelize-typescript";
import {custom, date, identifier, object, serializable} from "serializr";
import {merge} from 'lodash';

@Table
export class StorageType extends Model<StorageType>{
    @serializable(identifier())
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @serializable
    @Unique
    @AllowNull(false)
    @Column
    name: string;

    @serializable(custom(config => config, config => config))
    @Column({
        type: DataType.JSONB,
        defaultValue: {}
    })
    config: any;

    @serializable(custom(data => data, data => data))
    @Column({
        type: DataType.JSONB,
        defaultValue: {}
    })
    data: any;

    @serializable(date())
    @CreatedAt
    creationDate: Date;

    @serializable(date())
    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;
}

@Table
export class Storage extends Model<Storage>{

    @serializable(identifier())
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @serializable
    @IsUUID(4)
    @Unique
    @AllowNull(false)
    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        comment: 'uuid for storage',
    })
    uuid: string;

    @serializable
    @Unique
    @AllowNull(false)
    @Column
    name: string;

    @serializable
    @ForeignKey(() => StorageType)
    @Column
    typeId: number;

    @serializable(object(StorageType))
    @BelongsTo(() => StorageType)
    type: StorageType;

    @serializable(custom(data => data, data => data))
    @Column({
        type: DataType.JSONB
    })
    data: any;

    @serializable(custom(config => config, config => config))
    @Column({
        type: DataType.JSONB,
        defaultValue: {}
    })
    config: any;

    @serializable(date())
    @CreatedAt
    creationDate: Date;

    @serializable(date())
    @UpdatedAt
    updatedOn: Date;

    @DeletedAt
    deletionDate: Date;

    mergeWithRawStorage(rawStorage){
        this.name = rawStorage.name;
        this.typeId = rawStorage.typeId;
        this.data = merge(this.data, rawStorage.data);
        this.config = merge(this.config, rawStorage.config);
        return this;
    }
};

