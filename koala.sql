INSERT INTO "public"."koalalas"("name", "gender", "age", "notes", "ready_for_transfer") VALUES('Charlie', 'M', '5', 'Likes things', TRUE) RETURNING "id", "name", "gender", "age", "notes", "ready_for_transfer";
INSERT INTO "public"."koalalas"("name", "gender", "age", "notes", "ready_for_transfer") VALUES('Not Charlie', 'M', '5', 'Things hate him', TRUE) RETURNING "id", "name", "gender", "age", "notes", "ready_for_transfer";
INSERT INTO "public"."koalalas"("name", "gender", "age", "notes", "ready_for_transfer") VALUES('Joe', 'F', '15', 'Likes dogs', FALSE) RETURNING "id", "name", "gender", "age", "notes", "ready_for_transfer";
INSERT INTO "public"."koalalas"("name", "gender", "age", "notes", "ready_for_transfer") VALUES('Sarah', 'F', '2', 'Misc things', FALSE) RETURNING "id", "name", "gender", "age", "notes", "ready_for_transfer";
INSERT INTO "public"."koalalas"("name", "gender", "age", "notes", "ready_for_transfer") VALUES('Steve', 'M', '4', 'Things and stuff', FALSE) RETURNING "id", "name", "gender", "age", "notes", "ready_for_transfer";
INSERT INTO "public"."koalalas" VALUES(DEFAULT) RETURNING "id", "name", "gender", "age", "notes", "ready_for_transfer";
