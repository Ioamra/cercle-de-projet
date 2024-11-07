--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-11-07 09:20:15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 215 (class 1259 OID 49272)
-- Name: avatar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.avatar (
    id integer NOT NULL,
    img character varying(255) NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 49275)
-- Name: avatar_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.avatar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 216
-- Name: avatar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.avatar_id_seq OWNED BY public.avatar.id;


--
-- TOC entry 217 (class 1259 OID 49276)
-- Name: lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson (
    id integer NOT NULL,
    title text NOT NULL,
    img text,
    video character varying(255),
    content text NOT NULL,
    description text NOT NULL,
    time_in_min integer NOT NULL,
    difficulty character varying(50) NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 49281)
-- Name: lesson_has_similary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_has_similary (
    id_lesson integer NOT NULL,
    id_lesson_similary integer NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 49284)
-- Name: lesson_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lesson_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 219
-- Name: lesson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lesson_id_seq OWNED BY public.lesson.id;


--
-- TOC entry 220 (class 1259 OID 49285)
-- Name: question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.question (
    id integer NOT NULL,
    content text NOT NULL,
    id_quiz integer NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 49290)
-- Name: question_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.question_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 221
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- TOC entry 222 (class 1259 OID 49291)
-- Name: quiz; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 49296)
-- Name: quiz_has_lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_has_lesson (
    id_quiz integer NOT NULL,
    id_lesson integer NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 49299)
-- Name: quiz_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quiz_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 224
-- Name: quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quiz_id_seq OWNED BY public.quiz.id;


--
-- TOC entry 225 (class 1259 OID 49300)
-- Name: quiz_result; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_result (
    id integer NOT NULL,
    note integer NOT NULL,
    creation_date timestamp without time zone DEFAULT now(),
    id_quiz integer NOT NULL,
    id_user_account integer NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 49304)
-- Name: quiz_result_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.quiz_result_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 226
-- Name: quiz_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quiz_result_id_seq OWNED BY public.quiz_result.id;


--
-- TOC entry 227 (class 1259 OID 49305)
-- Name: response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.response (
    id integer NOT NULL,
    content character varying(255) NOT NULL,
    is_correct boolean NOT NULL,
    id_question integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 49308)
-- Name: response_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.response_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 228
-- Name: response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.response_id_seq OWNED BY public.response.id;


--
-- TOC entry 229 (class 1259 OID 49309)
-- Name: user_account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    pseudo character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    first_name character varying(50) NOT NULL,
    password character varying(64) NOT NULL,
    role character varying(50) DEFAULT 'user'::character varying,
    id_avatar integer NOT NULL
);


--
-- TOC entry 230 (class 1259 OID 49315)
-- Name: user_account_has_friend; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account_has_friend (
    id_user_account integer NOT NULL,
    id_friend integer NOT NULL,
    accepted boolean DEFAULT false
);


--
-- TOC entry 231 (class 1259 OID 49319)
-- Name: user_account_has_lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account_has_lesson (
    id_user_account integer NOT NULL,
    id_lesson integer NOT NULL
);


--
-- TOC entry 232 (class 1259 OID 49322)
-- Name: user_account_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_account_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 232
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_account_id_seq OWNED BY public.user_account.id;


--
-- TOC entry 233 (class 1259 OID 49323)
-- Name: user_response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_response (
    id integer NOT NULL,
    id_response integer NOT NULL,
    id_question integer NOT NULL,
    id_quiz_result integer NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 49326)
-- Name: user_response_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_response_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 234
-- Name: user_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_response_id_seq OWNED BY public.user_response.id;


--
-- TOC entry 4739 (class 2604 OID 49327)
-- Name: avatar id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avatar ALTER COLUMN id SET DEFAULT nextval('public.avatar_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 49328)
-- Name: lesson id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson ALTER COLUMN id SET DEFAULT nextval('public.lesson_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 49329)
-- Name: question id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 49330)
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 49331)
-- Name: quiz_result id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result ALTER COLUMN id SET DEFAULT nextval('public.quiz_result_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 49332)
-- Name: response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response ALTER COLUMN id SET DEFAULT nextval('public.response_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 49333)
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account ALTER COLUMN id SET DEFAULT nextval('public.user_account_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 49334)
-- Name: user_response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response ALTER COLUMN id SET DEFAULT nextval('public.user_response_id_seq'::regclass);


--
-- TOC entry 4937 (class 0 OID 49272)
-- Dependencies: 215
-- Data for Name: avatar; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.avatar VALUES (1, 'avatar/default.png');
INSERT INTO public.avatar VALUES (2, 'avatar/tankman.png');


--
-- TOC entry 4939 (class 0 OID 49276)
-- Dependencies: 217
-- Data for Name: lesson; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4940 (class 0 OID 49281)
-- Dependencies: 218
-- Data for Name: lesson_has_similary; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4942 (class 0 OID 49285)
-- Dependencies: 220
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.question VALUES (1, 'Quel est le principal gaz à effet de serre produit par les activités humaines ?', 1);
INSERT INTO public.question VALUES (2, 'Quelle conséquence du changement climatique est déjà observable ?', 1);
INSERT INTO public.question VALUES (3, 'Depuis le début de l’ère industrielle, la température moyenne de la planète a augmenté de :', 1);
INSERT INTO public.question VALUES (4, 'Quel secteur émet le plus de gaz à effet de serre dans le monde ?', 1);
INSERT INTO public.question VALUES (5, 'Quelle région de la planète se réchauffe environ deux fois plus vite que la moyenne mondiale ?', 1);
INSERT INTO public.question VALUES (6, 'Lequel de ces phénomènes est un effet direct du changement climatique ?', 1);
INSERT INTO public.question VALUES (7, 'Quel est l''objectif principal de l''Accord de Paris de 2015 ?', 1);
INSERT INTO public.question VALUES (8, 'Quel est le principal effet du méthane (CH₄) dans l’atmosphère ?', 1);
INSERT INTO public.question VALUES (9, 'Quel phénomène climatique est lié à une hausse anormale des températures océaniques dans le Pacifique équatorial ?', 1);
INSERT INTO public.question VALUES (10, 'Quelle est la cause principale de l’élévation du niveau de la mer ?', 1);
INSERT INTO public.question VALUES (11, 'Quel est le principal type de pollution dans les océans aujourd''hui ?', 2);
INSERT INTO public.question VALUES (12, 'Quel phénomène provoque l’acidification des océans ?', 2);
INSERT INTO public.question VALUES (13, 'Quel est l''impact principal des filets de pêche perdus dans les océans ?', 2);
INSERT INTO public.question VALUES (14, 'La grande majorité des déchets plastiques retrouvés en mer provient de :', 2);
INSERT INTO public.question VALUES (15, 'Quel pourcentage de l''oxygène mondial est produit par les océans ?', 2);
INSERT INTO public.question VALUES (16, 'Quel est l''effet du réchauffement climatique sur les récifs coralliens ?', 2);
INSERT INTO public.question VALUES (17, 'Quel est le danger des microplastiques dans les océans ?', 2);
INSERT INTO public.question VALUES (18, 'Quelles espèces marines sont particulièrement touchées par la pollution plastique ?', 2);
INSERT INTO public.question VALUES (19, 'Quel est l''impact de la surpêche sur les écosystèmes marins ?', 2);
INSERT INTO public.question VALUES (20, 'Quel est l''effet de la déforestation sur les océans ?', 2);


--
-- TOC entry 4944 (class 0 OID 49291)
-- Dependencies: 222
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.quiz VALUES (1, 'Quizz Climat', 'Quizz Climat');
INSERT INTO public.quiz VALUES (2, 'Quizz Océans', 'Quizz Océans');


--
-- TOC entry 4945 (class 0 OID 49296)
-- Dependencies: 223
-- Data for Name: quiz_has_lesson; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4947 (class 0 OID 49300)
-- Dependencies: 225
-- Data for Name: quiz_result; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4949 (class 0 OID 49305)
-- Dependencies: 227
-- Data for Name: response; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.response VALUES (1, 'Dioxyde de soufre', false, 1);
INSERT INTO public.response VALUES (2, 'Méthane', false, 1);
INSERT INTO public.response VALUES (3, 'Dioxyde de carbone', true, 1);
INSERT INTO public.response VALUES (4, 'Ozone', false, 1);
INSERT INTO public.response VALUES (5, 'Réduction des gaz à effet de serre', false, 2);
INSERT INTO public.response VALUES (6, 'Diminution des précipitations dans les déserts', false, 2);
INSERT INTO public.response VALUES (7, 'Fonte des glaciers', true, 2);
INSERT INTO public.response VALUES (8, 'Augmentation de l’épaisseur de la couche d’ozone', false, 2);
INSERT INTO public.response VALUES (9, 'Environ 0,5 °C', false, 3);
INSERT INTO public.response VALUES (10, 'Environ 1,1 °C', true, 3);
INSERT INTO public.response VALUES (11, 'Environ 3 °C', false, 3);
INSERT INTO public.response VALUES (12, 'Environ 5 °C', false, 3);
INSERT INTO public.response VALUES (13, 'L’industrie', false, 4);
INSERT INTO public.response VALUES (14, 'L’agriculture', false, 4);
INSERT INTO public.response VALUES (15, 'La production d’énergie', true, 4);
INSERT INTO public.response VALUES (16, 'Les transports', false, 4);
INSERT INTO public.response VALUES (17, 'L''Amazonie', false, 5);
INSERT INTO public.response VALUES (18, 'L''Afrique', false, 5);
INSERT INTO public.response VALUES (19, 'L’Australie', false, 5);
INSERT INTO public.response VALUES (20, 'L’Arctique', true, 5);
INSERT INTO public.response VALUES (21, 'La diminution de la population mondiale', false, 6);
INSERT INTO public.response VALUES (22, 'L’augmentation des catastrophes naturelles', true, 6);
INSERT INTO public.response VALUES (23, 'La réduction de la couverture forestière mondiale', false, 6);
INSERT INTO public.response VALUES (24, 'L’augmentation de la biodiversité', false, 6);
INSERT INTO public.response VALUES (25, 'Limiter le réchauffement climatique bien en dessous de 2 °C', true, 7);
INSERT INTO public.response VALUES (26, 'Arrêter totalement les émissions de gaz à effet de serre', false, 7);
INSERT INTO public.response VALUES (27, 'Planter des arbres dans tous les pays signataires', false, 7);
INSERT INTO public.response VALUES (28, 'Réduire la production de plastique', false, 7);
INSERT INTO public.response VALUES (29, 'Il cause des pluies acides', false, 8);
INSERT INTO public.response VALUES (30, 'Il détruit la couche d’ozone', false, 8);
INSERT INTO public.response VALUES (31, 'Il contribue au réchauffement climatique', true, 8);
INSERT INTO public.response VALUES (32, 'Il augmente la salinité des océans', false, 8);
INSERT INTO public.response VALUES (33, 'El Niño', true, 9);
INSERT INTO public.response VALUES (34, 'La Niña', false, 9);
INSERT INTO public.response VALUES (35, 'Les moussons', false, 9);
INSERT INTO public.response VALUES (36, 'La dépression des Açores', false, 9);
INSERT INTO public.response VALUES (37, 'La fonte des glaciers et des calottes glaciaires', true, 10);
INSERT INTO public.response VALUES (38, 'L''augmentation des précipitations', false, 10);
INSERT INTO public.response VALUES (39, 'La réduction de l’évaporation des océans', false, 10);
INSERT INTO public.response VALUES (40, 'La formation accrue de nuages', false, 10);
INSERT INTO public.response VALUES (41, 'Les déchets plastiques', true, 11);
INSERT INTO public.response VALUES (42, 'Les eaux usées industrielles', false, 11);
INSERT INTO public.response VALUES (43, 'Les déchets organiques', false, 11);
INSERT INTO public.response VALUES (44, 'Le sable', false, 11);
INSERT INTO public.response VALUES (45, 'La réduction de l’oxygène dans l’eau', false, 12);
INSERT INTO public.response VALUES (46, 'L''augmentation de la température de l’eau', false, 12);
INSERT INTO public.response VALUES (47, 'L’absorption du dioxyde de carbone par l’océan', true, 12);
INSERT INTO public.response VALUES (48, 'Le rejet de sel par les glaciers', false, 12);
INSERT INTO public.response VALUES (49, 'Ils servent d''abri aux poissons', false, 13);
INSERT INTO public.response VALUES (50, 'Ils aident à la reproduction des espèces marines', false, 13);
INSERT INTO public.response VALUES (51, 'Ils piègent et tuent la faune marine', true, 13);
INSERT INTO public.response VALUES (52, 'Ils fertilisent les récifs coralliens', false, 13);
INSERT INTO public.response VALUES (53, 'Navires marchands', false, 14);
INSERT INTO public.response VALUES (54, 'Activités de pêche', false, 14);
INSERT INTO public.response VALUES (55, 'Bateaux de croisière', false, 14);
INSERT INTO public.response VALUES (56, 'Déchets terrestres charriés par les rivières', true, 14);
INSERT INTO public.response VALUES (57, 'Environ 10 %', false, 15);
INSERT INTO public.response VALUES (58, 'Environ 50 %', true, 15);
INSERT INTO public.response VALUES (59, 'Environ 25 %', false, 15);
INSERT INTO public.response VALUES (60, 'Environ 80 %', false, 15);
INSERT INTO public.response VALUES (61, 'Il favorise leur croissance', false, 16);
INSERT INTO public.response VALUES (62, 'Il les blanchit et les affaiblit', true, 16);
INSERT INTO public.response VALUES (63, 'Il les rend plus résistants aux polluants', false, 16);
INSERT INTO public.response VALUES (64, 'Il n''a aucun impact sur les coraux', false, 16);
INSERT INTO public.response VALUES (65, 'Ils absorbent des polluants toxiques', true, 17);
INSERT INTO public.response VALUES (66, 'Ils bloquent les courants marins', false, 17);
INSERT INTO public.response VALUES (67, 'Ils augmentent la biodiversité', false, 17);
INSERT INTO public.response VALUES (68, 'Ils accélèrent l''évaporation de l''eau', false, 17);
INSERT INTO public.response VALUES (69, 'Les requins', false, 18);
INSERT INTO public.response VALUES (70, 'Les dauphins', false, 18);
INSERT INTO public.response VALUES (71, ' Les tortues marines', true, 18);
INSERT INTO public.response VALUES (72, 'Les méduses', false, 18);
INSERT INTO public.response VALUES (73, 'Elle favorise la diversité des espèces', false, 19);
INSERT INTO public.response VALUES (74, 'Elle entraîne l''extinction de nombreuses espèces', true, 19);
INSERT INTO public.response VALUES (75, 'Elle améliore la qualité de l''eau', false, 19);
INSERT INTO public.response VALUES (76, 'Elle régule naturellement les populations de poissons', false, 19);
INSERT INTO public.response VALUES (77, 'Aucun effet direct', false, 20);
INSERT INTO public.response VALUES (78, 'Augmentation des déchets dans les océans', false, 20);
INSERT INTO public.response VALUES (79, 'Création de nouvelles zones de pêche', false, 20);
INSERT INTO public.response VALUES (80, 'Augmentation de la pollution par ruissellement de sédiments', true, 20);


--
-- TOC entry 4951 (class 0 OID 49309)
-- Dependencies: 229
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_account VALUES (1, 'admin@gmail.com', 'Admin', 'Admin', 'Admin', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'admin', 1);
INSERT INTO public.user_account VALUES (2, 'user@gmail.com', 'User', 'Michel', 'Jean', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);


--
-- TOC entry 4952 (class 0 OID 49315)
-- Dependencies: 230
-- Data for Name: user_account_has_friend; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4953 (class 0 OID 49319)
-- Dependencies: 231
-- Data for Name: user_account_has_lesson; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4955 (class 0 OID 49323)
-- Dependencies: 233
-- Data for Name: user_response; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 216
-- Name: avatar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.avatar_id_seq', 2, true);


--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 219
-- Name: lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lesson_id_seq', 1, false);


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 221
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.question_id_seq', 1, false);


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 224
-- Name: quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_id_seq', 1, false);


--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 226
-- Name: quiz_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_result_id_seq', 1, false);


--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 228
-- Name: response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.response_id_seq', 1, false);


--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 232
-- Name: user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_account_id_seq', 2, true);


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 234
-- Name: user_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_response_id_seq', 1, false);


--
-- TOC entry 4751 (class 2606 OID 49336)
-- Name: avatar avatar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avatar
    ADD CONSTRAINT avatar_pkey PRIMARY KEY (id);


--
-- TOC entry 4755 (class 2606 OID 49338)
-- Name: lesson_has_similary lesson_has_similary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_pkey PRIMARY KEY (id_lesson, id_lesson_similary);


--
-- TOC entry 4753 (class 2606 OID 49340)
-- Name: lesson lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT lesson_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 2606 OID 49342)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- TOC entry 4761 (class 2606 OID 49344)
-- Name: quiz_has_lesson quiz_has_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_pkey PRIMARY KEY (id_quiz, id_lesson);


--
-- TOC entry 4759 (class 2606 OID 49346)
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 49348)
-- Name: quiz_result quiz_result_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_pkey PRIMARY KEY (id);


--
-- TOC entry 4765 (class 2606 OID 49350)
-- Name: response response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_pkey PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 49352)
-- Name: user_account user_account_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_email_key UNIQUE (email);


--
-- TOC entry 4773 (class 2606 OID 49354)
-- Name: user_account_has_friend user_account_has_friend_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_pkey PRIMARY KEY (id_user_account, id_friend);


--
-- TOC entry 4775 (class 2606 OID 49356)
-- Name: user_account_has_lesson user_account_has_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_pkey PRIMARY KEY (id_user_account, id_lesson);


--
-- TOC entry 4769 (class 2606 OID 49358)
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 49360)
-- Name: user_account user_account_pseudo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pseudo_key UNIQUE (pseudo);


--
-- TOC entry 4777 (class 2606 OID 49362)
-- Name: user_response user_response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 49363)
-- Name: lesson_has_similary lesson_has_similary_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4779 (class 2606 OID 49368)
-- Name: lesson_has_similary lesson_has_similary_id_lesson_similary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_id_lesson_similary_fkey FOREIGN KEY (id_lesson_similary) REFERENCES public.lesson(id);


--
-- TOC entry 4780 (class 2606 OID 49373)
-- Name: question question_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4781 (class 2606 OID 49378)
-- Name: quiz_has_lesson quiz_has_lesson_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4782 (class 2606 OID 49383)
-- Name: quiz_has_lesson quiz_has_lesson_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4783 (class 2606 OID 49388)
-- Name: quiz_result quiz_result_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4784 (class 2606 OID 49393)
-- Name: quiz_result quiz_result_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4785 (class 2606 OID 49398)
-- Name: response response_id_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_id_question_fkey FOREIGN KEY (id_question) REFERENCES public.question(id);


--
-- TOC entry 4787 (class 2606 OID 49403)
-- Name: user_account_has_friend user_account_has_friend_id_friend_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_id_friend_fkey FOREIGN KEY (id_friend) REFERENCES public.user_account(id);


--
-- TOC entry 4788 (class 2606 OID 49408)
-- Name: user_account_has_friend user_account_has_friend_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4789 (class 2606 OID 49413)
-- Name: user_account_has_lesson user_account_has_lesson_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4790 (class 2606 OID 49418)
-- Name: user_account_has_lesson user_account_has_lesson_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4786 (class 2606 OID 49423)
-- Name: user_account user_account_id_avatar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_id_avatar_fkey FOREIGN KEY (id_avatar) REFERENCES public.avatar(id);


--
-- TOC entry 4791 (class 2606 OID 49428)
-- Name: user_response user_response_id_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_question_fkey FOREIGN KEY (id_question) REFERENCES public.question(id);


--
-- TOC entry 4792 (class 2606 OID 49433)
-- Name: user_response user_response_id_quiz_result_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_quiz_result_fkey FOREIGN KEY (id_quiz_result) REFERENCES public.quiz_result(id);


--
-- TOC entry 4793 (class 2606 OID 49438)
-- Name: user_response user_response_id_response_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_response_fkey FOREIGN KEY (id_response) REFERENCES public.response(id);


-- Completed on 2024-11-07 09:20:15

--
-- PostgreSQL database dump complete
--

