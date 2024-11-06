--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-11-06 03:07:50

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
-- TOC entry 220 (class 1259 OID 41099)
-- Name: avatar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.avatar (
    id integer NOT NULL,
    img character varying(255) NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 41098)
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
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 219
-- Name: avatar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.avatar_id_seq OWNED BY public.avatar.id;


--
-- TOC entry 218 (class 1259 OID 41090)
-- Name: lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson (
    id integer NOT NULL,
    title text NOT NULL,
    img text,
    video character varying(255),
    content text NOT NULL,
    description text NOT NULL
);


--
-- TOC entry 232 (class 1259 OID 41202)
-- Name: lesson_has_similary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_has_similary (
    id_lesson integer NOT NULL,
    id_lesson_similary integer NOT NULL
);


--
-- TOC entry 217 (class 1259 OID 41089)
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
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 217
-- Name: lesson_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lesson_id_seq OWNED BY public.lesson.id;


--
-- TOC entry 222 (class 1259 OID 41106)
-- Name: question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.question (
    id integer NOT NULL,
    content text NOT NULL,
    id_quiz integer NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 41105)
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
-- TOC entry 4960 (class 0 OID 0)
-- Dependencies: 221
-- Name: question_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.question_id_seq OWNED BY public.question.id;


--
-- TOC entry 216 (class 1259 OID 41081)
-- Name: quiz; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL
);


--
-- TOC entry 233 (class 1259 OID 41217)
-- Name: quiz_has_lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_has_lesson (
    id_quiz integer NOT NULL,
    id_lesson integer NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 41080)
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
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 215
-- Name: quiz_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quiz_id_seq OWNED BY public.quiz.id;


--
-- TOC entry 228 (class 1259 OID 41147)
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
-- TOC entry 227 (class 1259 OID 41146)
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
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 227
-- Name: quiz_result_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.quiz_result_id_seq OWNED BY public.quiz_result.id;


--
-- TOC entry 224 (class 1259 OID 41120)
-- Name: response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.response (
    id integer NOT NULL,
    content character varying(255) NOT NULL,
    is_correct boolean NOT NULL,
    id_question integer NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 41119)
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
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 223
-- Name: response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.response_id_seq OWNED BY public.response.id;


--
-- TOC entry 226 (class 1259 OID 41132)
-- Name: user_account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account (
   id integer NOT NULL,
   email character varying(255) NOT NULL UNIQUE,
   pseudo character varying(50) NOT NULL UNIQUE,
   last_name character varying(50) NOT NULL,
   first_name character varying(50) NOT NULL,
   password character varying(64) NOT NULL,
   role character varying(50) DEFAULT 'user'::character varying,
   id_avatar integer NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 41186)
-- Name: user_account_has_friend; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account_has_friend (
    id_user_account integer NOT NULL,
    id_friend integer NOT NULL,
    accepted boolean DEFAULT false
);


--
-- TOC entry 234 (class 1259 OID 41232)
-- Name: user_account_has_lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account_has_lesson (
    id_user_account integer NOT NULL,
    id_lesson integer NOT NULL
);


--
-- TOC entry 225 (class 1259 OID 41131)
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
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_account_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_account_id_seq OWNED BY public.user_account.id;


--
-- TOC entry 230 (class 1259 OID 41165)
-- Name: user_response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_response (
    id integer NOT NULL,
    id_response integer NOT NULL,
    id_question integer NOT NULL,
    id_quiz_result integer NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 41164)
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
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 229
-- Name: user_response_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_response_id_seq OWNED BY public.user_response.id;


--
-- TOC entry 4741 (class 2604 OID 41102)
-- Name: avatar id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avatar ALTER COLUMN id SET DEFAULT nextval('public.avatar_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 41093)
-- Name: lesson id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson ALTER COLUMN id SET DEFAULT nextval('public.lesson_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 41109)
-- Name: question id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- TOC entry 4739 (class 2604 OID 41084)
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 41150)
-- Name: quiz_result id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result ALTER COLUMN id SET DEFAULT nextval('public.quiz_result_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 41123)
-- Name: response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response ALTER COLUMN id SET DEFAULT nextval('public.response_id_seq'::regclass);


--
-- TOC entry 4744 (class 2604 OID 41135)
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account ALTER COLUMN id SET DEFAULT nextval('public.user_account_id_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 41168)
-- Name: user_response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response ALTER COLUMN id SET DEFAULT nextval('public.user_response_id_seq'::regclass);


--
-- TOC entry 4938 (class 0 OID 41099)
-- Dependencies: 220
-- Data for Name: avatar; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.avatar VALUES (1, 'avatar/default.png');
INSERT INTO public.avatar VALUES (2, 'avatar/tankman.png');


--
-- TOC entry 4936 (class 0 OID 41090)
-- Dependencies: 218
-- Data for Name: lesson; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4950 (class 0 OID 41202)
-- Dependencies: 232
-- Data for Name: lesson_has_similary; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4940 (class 0 OID 41106)
-- Dependencies: 222
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4934 (class 0 OID 41081)
-- Dependencies: 216
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4951 (class 0 OID 41217)
-- Dependencies: 233
-- Data for Name: quiz_has_lesson; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4946 (class 0 OID 41147)
-- Dependencies: 228
-- Data for Name: quiz_result; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4942 (class 0 OID 41120)
-- Dependencies: 224
-- Data for Name: response; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4944 (class 0 OID 41132)
-- Dependencies: 226
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_account VALUES (1, 'admin@gmail.com', 'Admin', 'Admin', 'Admin', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'admin', 1);
INSERT INTO public.user_account VALUES (2, 'user@gmail.com', 'User', 'User', 'User', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);


--
-- TOC entry 4949 (class 0 OID 41186)
-- Dependencies: 231
-- Data for Name: user_account_has_friend; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4952 (class 0 OID 41232)
-- Dependencies: 234
-- Data for Name: user_account_has_lesson; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4948 (class 0 OID 41165)
-- Dependencies: 230
-- Data for Name: user_response; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 219
-- Name: avatar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.avatar_id_seq', 2, true);


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 217
-- Name: lesson_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lesson_id_seq', 1, false);


--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 221
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.question_id_seq', 1, false);


--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 215
-- Name: quiz_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_id_seq', 1, false);


--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 227
-- Name: quiz_result_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.quiz_result_id_seq', 1, false);


--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 223
-- Name: response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.response_id_seq', 1, false);


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_account_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_account_id_seq', 2, true);


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 229
-- Name: user_response_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_response_id_seq', 1, false);


--
-- TOC entry 4755 (class 2606 OID 41104)
-- Name: avatar avatar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avatar
    ADD CONSTRAINT avatar_pkey PRIMARY KEY (id);


--
-- TOC entry 4769 (class 2606 OID 41206)
-- Name: lesson_has_similary lesson_has_similary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_pkey PRIMARY KEY (id_lesson, id_lesson_similary);


--
-- TOC entry 4753 (class 2606 OID 41097)
-- Name: lesson lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT lesson_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 2606 OID 41113)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 41221)
-- Name: quiz_has_lesson quiz_has_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_pkey PRIMARY KEY (id_quiz, id_lesson);


--
-- TOC entry 4751 (class 2606 OID 41088)
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 41153)
-- Name: quiz_result quiz_result_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_pkey PRIMARY KEY (id);


--
-- TOC entry 4759 (class 2606 OID 41125)
-- Name: response response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_pkey PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 41191)
-- Name: user_account_has_friend user_account_has_friend_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_pkey PRIMARY KEY (id_user_account, id_friend);


--
-- TOC entry 4773 (class 2606 OID 41236)
-- Name: user_account_has_lesson user_account_has_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_pkey PRIMARY KEY (id_user_account, id_lesson);


--
-- TOC entry 4761 (class 2606 OID 41140)
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- TOC entry 4765 (class 2606 OID 41170)
-- Name: user_response user_response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_pkey PRIMARY KEY (id);


--
-- TOC entry 4784 (class 2606 OID 41207)
-- Name: lesson_has_similary lesson_has_similary_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4785 (class 2606 OID 41212)
-- Name: lesson_has_similary lesson_has_similary_id_lesson_similary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_id_lesson_similary_fkey FOREIGN KEY (id_lesson_similary) REFERENCES public.lesson(id);


--
-- TOC entry 4774 (class 2606 OID 41114)
-- Name: question question_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4786 (class 2606 OID 41227)
-- Name: quiz_has_lesson quiz_has_lesson_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4787 (class 2606 OID 41222)
-- Name: quiz_has_lesson quiz_has_lesson_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4777 (class 2606 OID 41154)
-- Name: quiz_result quiz_result_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4778 (class 2606 OID 41159)
-- Name: quiz_result quiz_result_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4775 (class 2606 OID 41126)
-- Name: response response_id_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_id_question_fkey FOREIGN KEY (id_question) REFERENCES public.question(id);


--
-- TOC entry 4782 (class 2606 OID 41197)
-- Name: user_account_has_friend user_account_has_friend_id_friend_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_id_friend_fkey FOREIGN KEY (id_friend) REFERENCES public.user_account(id);


--
-- TOC entry 4783 (class 2606 OID 41192)
-- Name: user_account_has_friend user_account_has_friend_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4788 (class 2606 OID 41242)
-- Name: user_account_has_lesson user_account_has_lesson_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4789 (class 2606 OID 41237)
-- Name: user_account_has_lesson user_account_has_lesson_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4776 (class 2606 OID 41141)
-- Name: user_account user_account_id_avatar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_id_avatar_fkey FOREIGN KEY (id_avatar) REFERENCES public.avatar(id);


--
-- TOC entry 4779 (class 2606 OID 41176)
-- Name: user_response user_response_id_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_question_fkey FOREIGN KEY (id_question) REFERENCES public.question(id);


--
-- TOC entry 4780 (class 2606 OID 41181)
-- Name: user_response user_response_id_quiz_result_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_quiz_result_fkey FOREIGN KEY (id_quiz_result) REFERENCES public.quiz_result(id);


--
-- TOC entry 4781 (class 2606 OID 41171)
-- Name: user_response user_response_id_response_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_response_fkey FOREIGN KEY (id_response) REFERENCES public.response(id);


-- Completed on 2024-11-06 03:07:50

--
-- PostgreSQL database dump complete
--

