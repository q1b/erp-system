import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userTable } from './user';
import { relations } from 'drizzle-orm';

type WebAuthnProviderType = 'webauthn';

type ProviderType = 'oidc' | 'oauth' | 'email' | 'credentials' | WebAuthnProviderType;

type AdapterAccountType = Extract<ProviderType, 'oauth' | 'oidc' | 'email' | 'webauthn'>;

export const accountTable = sqliteTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => userTable.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccountType>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state')
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId]
		})
	})
);

export const accountRelations = relations(accountTable, ({ one }) => ({
	user: one(userTable, {
		fields: [accountTable.userId],
		references: [userTable.id]
	})
}));
