import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { compareValue, hashValue } from "../../utils/bcrypt.js";
import { Integration } from "./integration.entity.js";
import { Event } from "./event.entity.js";
import { Availability } from "./availability.entity.js";
import { Meeting } from "./meeting.entity.js";

@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ nullable: false })
    name: string

    @Column({ nullable: false, unique: true })
    username: string

    @Column({ nullable: false, unique: true })
    email: string

    @Column({ nullable: false })
    password: string

    @Column({ nullable: true })
    imageUrl?: string

    @OneToMany(() => Integration, (integration) => integration.user, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    integrations: Integration[]

    @OneToMany(() => Event, (event) => event.user, {
        cascade: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    events: Event[]


    @OneToOne(() => Availability, (availability) => availability.user, {
        cascade: true,
    })
    @JoinColumn()
    availability: Availability;

    @OneToMany(() => Meeting, (meeting) => meeting.user, {
        cascade: true,
    })
    meetings: Meeting[];
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await hashValue(this.password);
        }
    }

    async comparePassword(password: string): Promise<boolean> {
        return await compareValue(password, this.password);
    }
    omitPassword(): Omit<User, "password"> {
        const { password, ...userWithoutPassword } = this;
        return userWithoutPassword as Omit<User, "password">;
    }
}