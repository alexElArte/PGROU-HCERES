-- This script is intended to either add a new user
-- with the default login and password values or,
-- if the user already exists, reset the user's password
-- to the default values.

-- user admin
-- password admin

INSERT INTO public.researcher (researcher_id, researcher_surname, researcher_name, researcher_email, researcher_orcid,
                               researcher_login, researcher_password)
VALUES (DEFAULT, 'admin', 'admin', 'admin@admin.com', null, 'admin',
        '$2a$10$tR4NMaRiVG.QZdXoCsmEUuDltA7Siy0kisCbUwT3p3P3s9wQWdySi')
ON CONFLICT (researcher_login) DO UPDATE SET researcher_password = '$2a$10$tR4NMaRiVG.QZdXoCsmEUuDltA7Siy0kisCbUwT3p3P3s9wQWdySi';

insert into public.admin (researcher_id)
values ((select researcher_id from public.researcher where researcher_login = 'admin'))
ON CONFLICT DO NOTHING;

-- user user
-- password user

INSERT INTO public.researcher (researcher_id, researcher_surname, researcher_name, researcher_email, researcher_orcid,
                               researcher_login, researcher_password)
VALUES (DEFAULT, 'user', 'user', 'user@user.com', null, 'user',
        '$2a$10$nbNEAKss3/jeNdOPfCqel.cLltnDIfE15jpGFEo7rZw1aY/5nAbzi')
ON CONFLICT (researcher_login) DO UPDATE SET researcher_password = '$2a$10$nbNEAKss3/jeNdOPfCqel.cLltnDIfE15jpGFEo7rZw1aY/5nAbzi';
