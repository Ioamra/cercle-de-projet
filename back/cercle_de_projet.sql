--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2024-11-07 16:53:03

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
-- TOC entry 215 (class 1259 OID 49453)
-- Name: avatar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.avatar (
    id integer NOT NULL,
    img character varying(255) NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 49456)
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
-- TOC entry 217 (class 1259 OID 49457)
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
-- TOC entry 218 (class 1259 OID 49462)
-- Name: lesson_has_similary; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_has_similary (
    id_lesson integer NOT NULL,
    id_lesson_similary integer NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 49465)
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
-- TOC entry 220 (class 1259 OID 49466)
-- Name: question; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.question (
    id integer NOT NULL,
    content text NOT NULL,
    id_quiz integer NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 49471)
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
-- TOC entry 222 (class 1259 OID 49472)
-- Name: quiz; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    time_in_min integer NOT NULL,
    difficulty character varying NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 49477)
-- Name: quiz_has_lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_has_lesson (
    id_quiz integer NOT NULL,
    id_lesson integer NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 49480)
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
-- TOC entry 225 (class 1259 OID 49481)
-- Name: quiz_result; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_result (
    id integer NOT NULL,
    note numeric NOT NULL,
    creation_date timestamp without time zone DEFAULT now(),
    id_quiz integer NOT NULL,
    id_user_account integer NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 49485)
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
-- TOC entry 227 (class 1259 OID 49486)
-- Name: response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.response (
    id integer NOT NULL,
    content character varying(255) NOT NULL,
    is_correct boolean NOT NULL,
    id_question integer NOT NULL
);


--
-- TOC entry 228 (class 1259 OID 49489)
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
-- TOC entry 229 (class 1259 OID 49490)
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
-- TOC entry 230 (class 1259 OID 49496)
-- Name: user_account_has_friend; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account_has_friend (
    id_user_account integer NOT NULL,
    id_friend integer NOT NULL,
    accepted boolean DEFAULT false
);


--
-- TOC entry 231 (class 1259 OID 49500)
-- Name: user_account_has_lesson; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_account_has_lesson (
    id_user_account integer NOT NULL,
    id_lesson integer NOT NULL
);


--
-- TOC entry 232 (class 1259 OID 49503)
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
-- TOC entry 233 (class 1259 OID 49504)
-- Name: user_response; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_response (
    id integer NOT NULL,
    id_response integer NOT NULL,
    id_question integer NOT NULL,
    id_quiz_result integer NOT NULL
);


--
-- TOC entry 234 (class 1259 OID 49507)
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
-- TOC entry 4739 (class 2604 OID 49508)
-- Name: avatar id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avatar ALTER COLUMN id SET DEFAULT nextval('public.avatar_id_seq'::regclass);


--
-- TOC entry 4740 (class 2604 OID 49509)
-- Name: lesson id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson ALTER COLUMN id SET DEFAULT nextval('public.lesson_id_seq'::regclass);


--
-- TOC entry 4741 (class 2604 OID 49510)
-- Name: question id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question ALTER COLUMN id SET DEFAULT nextval('public.question_id_seq'::regclass);


--
-- TOC entry 4742 (class 2604 OID 49511)
-- Name: quiz id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz ALTER COLUMN id SET DEFAULT nextval('public.quiz_id_seq'::regclass);


--
-- TOC entry 4743 (class 2604 OID 49512)
-- Name: quiz_result id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result ALTER COLUMN id SET DEFAULT nextval('public.quiz_result_id_seq'::regclass);


--
-- TOC entry 4745 (class 2604 OID 49513)
-- Name: response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response ALTER COLUMN id SET DEFAULT nextval('public.response_id_seq'::regclass);


--
-- TOC entry 4746 (class 2604 OID 49514)
-- Name: user_account id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account ALTER COLUMN id SET DEFAULT nextval('public.user_account_id_seq'::regclass);


--
-- TOC entry 4749 (class 2604 OID 49515)
-- Name: user_response id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response ALTER COLUMN id SET DEFAULT nextval('public.user_response_id_seq'::regclass);


--
-- TOC entry 4937 (class 0 OID 49453)
-- Dependencies: 215
-- Data for Name: avatar; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.avatar VALUES (1, 'avatar/default.png');
INSERT INTO public.avatar VALUES (2, 'avatar/tankman.png');


--
-- TOC entry 4939 (class 0 OID 49457)
-- Dependencies: 217
-- Data for Name: lesson; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.lesson VALUES (4, 'L''impact du changement climatique', NULL, NULL, 'Le changement climatique est l''une des plus grandes menaces auxquelles l''humanité est confrontée au XXIe siècle. Il résulte principalement de l''augmentation des concentrations de gaz à effet de serre dans l''atmosphère, causée par les activités humaines telles que la combustion des combustibles fossiles, la déforestation et l''agriculture intensive. Comprendre l''impact du changement climatique est essentiel pour élaborer des stratégies d''adaptation et d''atténuation efficaces.

Le réchauffement global est la manifestation la plus évidente du changement climatique. Depuis le début de l''ère industrielle, la température moyenne de la planète a augmenté d''environ 1,1 degré Celsius. Cette augmentation, bien que semblant minime, a des conséquences profondes sur les systèmes climatiques mondiaux. Les vagues de chaleur deviennent plus fréquentes et intenses, augmentant les risques pour la santé humaine, l''agriculture et les écosystèmes.

Les glaciers et les calottes glaciaires fondent à un rythme alarmant. La fonte de la glace terrestre contribue à l''élévation du niveau de la mer, menaçant les zones côtières et les petites îles. Des villes côtières comme Miami, Shanghai et Mumbai sont confrontées à des risques accrus d''inondations. Les communautés vivant dans ces régions pourraient être déplacées, créant ainsi des réfugiés climatiques et exacerbant les tensions géopolitiques.', 'Analyse des effets du changement climatique sur la planète et sur nos vies, ainsi que des solutions pour réduire notre empreinte carbone.', 30, 'Avancé');
INSERT INTO public.lesson VALUES (1, 'Introduction à l''écologie', NULL, NULL, 'L''écologie est la science qui étudie les interactions entre les êtres vivants et leur environnement. Elle examine comment les plantes, les animaux et les micro-organismes interagissent entre eux et avec les éléments non vivants comme l''air, l''eau et le sol. Comprendre ces interactions est essentiel pour protéger notre planète et assurer un avenir durable.
    Les écosystèmes sont au cœur de l''écologie. Un écosystème est une communauté d''êtres vivants évoluant dans un environnement donné, où chaque élément joue un rôle spécifique. Par exemple, les plantes produisent de l''oxygène et servent de nourriture aux herbivores, qui à leur tour peuvent être mangés par des carnivores. La décomposition des organismes morts enrichit le sol, favorisant ainsi la croissance de nouvelles plantes.
    La biodiversité, ou diversité biologique, fait référence à la variété de la vie sur Terre. Elle inclut la diversité des espèces, des gènes et des écosystèmes. Une biodiversité riche est un signe de santé pour un écosystème, car elle augmente sa résilience face aux changements et aux perturbations.
    Les activités humaines ont un impact significatif sur l''écologie. La déforestation, la pollution, le changement climatique et la surexploitation des ressources naturelles menacent la stabilité des écosystèmes. Par exemple, la pollution de l''eau peut tuer les poissons et les plantes aquatiques, perturbant ainsi la chaîne alimentaire.
    Il est crucial de prendre conscience de ces enjeux et d''adopter des pratiques respectueuses de l''environnement. Recycler, réduire notre consommation d''énergie, utiliser des transports en commun et soutenir des initiatives écologiques sont autant de moyens par lesquels nous pouvons contribuer à la préservation de notre planète.
    Dans cette leçon, nous allons explorer les principes fondamentaux de l''écologie, comprendre l''importance des écosystèmes et de la biodiversité, et découvrir comment nos actions peuvent avoir un impact positif ou négatif sur l''environnement. Cette leçon vous introduit aux concepts de base de l''écologie, en expliquant les interactions entre les êtres vivants et leur environnement, et en soulignant l''importance de préserver notre planète.', 'Découvrez les principes de base de l''écologie et pourquoi il est essentiel de protéger notre environnement.', 15, 'Débutant');
INSERT INTO public.lesson VALUES (2, 'Les énergies renouvelables', NULL, NULL, 'Les énergies renouvelables sont des sources d''énergie qui se régénèrent naturellement et dont l''utilisation n''épuise pas les ressources de la planète. Contrairement aux énergies fossiles telles que le pétrole, le charbon et le gaz naturel, qui sont limitées et contribuent au réchauffement climatique, les énergies renouvelables offrent une alternative durable pour répondre aux besoins énergétiques mondiaux.

L''une des principales sources d''énergie renouvelable est l''énergie solaire. Elle provient du rayonnement du soleil et peut être exploitée de plusieurs manières. Les panneaux photovoltaïques convertissent directement la lumière solaire en électricité grâce à l''effet photovoltaïque. Cette technologie est utilisée à la fois pour des applications résidentielles, comme l''alimentation des maisons individuelles, et pour des installations à grande échelle, comme les fermes solaires. Les panneaux solaires thermiques, quant à eux, utilisent la chaleur du soleil pour chauffer de l''eau ou de l''air, ce qui peut être utilisé pour le chauffage domestique ou pour produire de l''électricité dans les centrales solaires thermodynamiques.

L''énergie éolienne est une autre source majeure d''énergie renouvelable. Elle est produite par le mouvement des masses d''air dans l''atmosphère. Les éoliennes captent l''énergie cinétique du vent grâce à des pales qui tournent, entraînant un générateur qui produit de l''électricité. Il existe deux types principaux d''éoliennes : les éoliennes terrestres, installées sur la terre ferme, et les éoliennes offshore, situées en mer où les vents sont généralement plus forts et plus constants. L''énergie éolienne est propre et abondante, mais sa production est intermittente car elle dépend des conditions météorologiques.

L''énergie hydraulique exploite le mouvement de l''eau pour générer de l''électricité. Les centrales hydroélectriques utilisent la force de l''eau en chute ou en écoulement pour faire tourner des turbines reliées à des générateurs électriques. Cette forme d''énergie est largement utilisée dans le monde et peut fournir une source d''électricité fiable et flexible. Les barrages hydroélectriques peuvent également servir à réguler les cours d''eau et à prévenir les inondations. Cependant, leur construction peut avoir des impacts environnementaux et sociaux importants, notamment la perturbation des écosystèmes aquatiques et le déplacement de populations locales.

La biomasse est une source d''énergie renouvelable qui provient de la matière organique, telle que le bois, les déchets agricoles et les déchets municipaux. La combustion de la biomasse peut produire de la chaleur pour le chauffage ou de l''électricité. De plus, la biomasse peut être transformée en biocarburants, comme le bioéthanol et le biodiesel, qui peuvent remplacer les carburants fossiles dans les transports. L''utilisation de la biomasse comme source d''énergie peut aider à gérer les déchets et à réduire les émissions de gaz à effet de serre, à condition que les ressources soient gérées de manière durable.

L''énergie géothermique exploite la chaleur interne de la Terre. Cette chaleur provient de la désintégration radioactive des éléments dans le noyau terrestre et de la chaleur résiduelle de la formation de la planète. L''énergie géothermique peut être utilisée pour le chauffage direct des bâtiments ou pour produire de l''électricité dans les centrales géothermiques. Elle offre une source d''énergie stable et continue, indépendamment des conditions météorologiques. Cependant, son exploitation est limitée aux régions où la chaleur est accessible à des profondeurs raisonnables.

L''énergie marine regroupe plusieurs technologies qui exploitent l''énergie des océans. Cela inclut l''énergie marémotrice, qui utilise les variations du niveau de la mer causées par les marées pour produire de l''électricité, et l''énergie des vagues, qui capte le mouvement des vagues de surface. Il existe également des technologies pour exploiter les courants marins et la différence de température entre les eaux de surface et les eaux profondes (conversion de l''énergie thermique des océans). L''énergie marine a un potentiel énorme, mais les technologies sont encore en développement et doivent surmonter des défis techniques et économiques.

L''hydrogène est souvent considéré comme un vecteur énergétique d''avenir. Bien qu''il ne soit pas une source d''énergie primaire, l''hydrogène peut être produit à partir de sources renouvelables, comme l''électrolyse de l''eau alimentée par de l''électricité verte. L''hydrogène peut ensuite être utilisé dans des piles à combustible pour produire de l''électricité, ne rejetant que de l''eau comme sous-produit. Cette technologie est prometteuse pour le stockage de l''énergie renouvelable et pour décarboner des secteurs difficiles à électrifier, comme le transport lourd et l''industrie.

Les avantages des énergies renouvelables sont multiples. Elles contribuent à réduire les émissions de gaz à effet de serre, limitant ainsi l''impact du changement climatique. Elles diminuent la dépendance aux combustibles fossiles importés, améliorant la sécurité énergétique. De plus, le développement des énergies renouvelables peut créer des emplois locaux et stimuler l''innovation technologique.

Cependant, les énergies renouvelables présentent également des défis. Leur production est souvent intermittente et variable, ce qui nécessite des solutions de stockage de l''énergie et une gestion intelligente du réseau électrique pour assurer un approvisionnement stable. Les coûts initiaux d''installation peuvent être élevés, bien que les prix aient considérablement baissé ces dernières années grâce aux progrès technologiques et aux économies d''échelle. De plus, certaines technologies peuvent avoir des impacts environnementaux ou sociaux qu''il convient de gérer, comme l''occupation des terres pour les parcs éoliens ou solaires, ou les effets sur la faune pour les éoliennes.

Les gouvernements jouent un rôle clé dans la promotion des énergies renouvelables. Des politiques incitatives, telles que les subventions, les tarifs d''achat garantis, les quotas d''énergie renouvelable et les taxes sur le carbone, peuvent encourager les investissements dans ces technologies. La planification et la réglementation peuvent également faciliter l''intégration des énergies renouvelables dans le réseau électrique et minimiser les impacts négatifs.

La participation du public est également importante. L''acceptation sociale des projets d''énergies renouvelables peut être améliorée grâce à la sensibilisation, à la consultation et à la participation des communautés locales. Les individus peuvent contribuer en installant des systèmes d''énergie renouvelable chez eux, en choisissant des fournisseurs d''énergie verte, ou en adaptant leur consommation d''énergie pour soutenir la transition énergétique.

En conclusion, les énergies renouvelables offrent une voie viable pour répondre aux besoins énergétiques mondiaux tout en protégeant l''environnement. Leur développement nécessite une approche intégrée, combinant des avancées technologiques, des politiques favorables, des investissements financiers, et la collaboration entre les différents acteurs de la société. La compréhension approfondie des différentes sources d''énergie renouvelable, de leur fonctionnement et de leurs avantages est essentielle pour participer activement à cette transition énergétique vers un avenir durable.', 'Comprendre les différentes sources d''énergie renouvelable, leur fonctionnement et leurs avantages.', 20, 'Intermédiaire');
INSERT INTO public.lesson VALUES (5, 'La biodiversité et sa préservation', NULL, NULL, 'La biodiversité, ou diversité biologique, désigne la variété et la variabilité des formes de vie sur Terre. Elle englobe la diversité des espèces, la diversité génétique au sein de ces espèces, et la diversité des écosystèmes. La biodiversité est essentielle pour le maintien des écosystèmes et des services qu''ils fournissent, tels que la purification de l''air et de l''eau, la pollinisation des cultures, la régulation du climat et la fourniture de ressources alimentaires, médicinales et matérielles.

La biodiversité est le résultat de milliards d''années d''évolution, façonnée par des processus naturels et, plus récemment, par l''influence des activités humaines. Chaque espèce, aussi petite soit-elle, joue un rôle spécifique dans son écosystème, contribuant à son équilibre et à sa résilience. La perte d''une seule espèce peut avoir des répercussions en cascade sur l''ensemble de l''écosystème.

Cependant, la biodiversité est aujourd''hui menacée à un rythme sans précédent. Les activités humaines sont la principale cause de cette érosion, notamment à travers la destruction et la fragmentation des habitats, la surexploitation des ressources, la pollution, l''introduction d''espèces invasives et le changement climatique. Selon les estimations, environ un million d''espèces animales et végétales sont actuellement en danger d''extinction.', 'Explorez la richesse de la biodiversité, ses bienfaits pour l''environnement et les actions pour la protéger.', 25, 'Intermédiaire');
INSERT INTO public.lesson VALUES (3, 'La gestion des déchets', NULL, NULL, 'La gestion des déchets est un enjeu majeur pour notre société moderne. Chaque jour, des tonnes de déchets sont produits par les ménages, les industries et les commerces. Cette accumulation pose de sérieux problèmes environnementaux, sanitaires et économiques. Comprendre comment gérer efficacement ces déchets est essentiel pour préserver notre planète et assurer un avenir durable.

Les déchets peuvent être classés en plusieurs catégories selon leur nature et leur origine. Les déchets ménagers proviennent des activités quotidiennes des foyers, comme les restes alimentaires, les emballages ou les objets usagés. Les déchets industriels sont générés par les activités de production et peuvent inclure des matériaux dangereux. Les déchets électroniques, ou e-déchets, comprennent les appareils électriques et électroniques en fin de vie, tels que les téléphones portables, les ordinateurs et les télévisions.

Une gestion efficace des déchets repose sur plusieurs principes clés. D''abord, la réduction à la source vise à diminuer la quantité de déchets produits. Cela peut être accompli en limitant les emballages, en évitant les produits à usage unique et en optant pour des biens durables. Ensuite, le réemploi consiste à utiliser à nouveau un objet pour son usage initial ou pour un autre usage, prolongeant ainsi sa durée de vie. Le recyclage permet de transformer les déchets en nouvelles matières premières, réduisant la consommation de ressources naturelles. Enfin, la valorisation énergétique utilise les déchets pour produire de l''énergie, par exemple en les incinérant pour générer de la chaleur ou de l''électricité.', 'Apprenez comment bien gérer les déchets, les options de recyclage et l''importance de réduire notre consommation.', 25, 'Débutant');


--
-- TOC entry 4940 (class 0 OID 49462)
-- Dependencies: 218
-- Data for Name: lesson_has_similary; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.lesson_has_similary VALUES (1, 2);
INSERT INTO public.lesson_has_similary VALUES (1, 5);
INSERT INTO public.lesson_has_similary VALUES (2, 3);
INSERT INTO public.lesson_has_similary VALUES (4, 5);


--
-- TOC entry 4942 (class 0 OID 49466)
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
-- TOC entry 4944 (class 0 OID 49472)
-- Dependencies: 222
-- Data for Name: quiz; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.quiz VALUES (1, 'Quizz Climat', 'Quizz Climat', 20, 'Intermédiaire');
INSERT INTO public.quiz VALUES (2, 'Quizz Océans', 'Quizz Océans', 20, 'Intermédiaire');


--
-- TOC entry 4945 (class 0 OID 49477)
-- Dependencies: 223
-- Data for Name: quiz_has_lesson; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.quiz_has_lesson VALUES (1, 1);
INSERT INTO public.quiz_has_lesson VALUES (1, 2);
INSERT INTO public.quiz_has_lesson VALUES (2, 3);
INSERT INTO public.quiz_has_lesson VALUES (2, 4);
INSERT INTO public.quiz_has_lesson VALUES (2, 5);


--
-- TOC entry 4947 (class 0 OID 49481)
-- Dependencies: 225
-- Data for Name: quiz_result; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.quiz_result VALUES (1, 0.5, '2024-11-07 16:44:59.104003', 1, 1);


--
-- TOC entry 4949 (class 0 OID 49486)
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
-- TOC entry 4951 (class 0 OID 49490)
-- Dependencies: 229
-- Data for Name: user_account; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_account VALUES (1, 'admin@gmail.com', 'Admin', 'Admin', 'Admin', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'admin', 1);
INSERT INTO public.user_account VALUES (2, 'user@gmail.com', 'User', 'Michel', 'Jean', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);
INSERT INTO public.user_account VALUES (3, 'john.doe@gmail.com', 'JohnLennon23', 'Doe', 'John', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);
INSERT INTO public.user_account VALUES (4, 'jane.smith@gmail.com', 'xXSmithXx', 'Smith', 'Jane', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 2);
INSERT INTO public.user_account VALUES (5, 'charlie.brown@gmail.com', 'BrownMonstre', 'Brown', 'Charlie', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);
INSERT INTO public.user_account VALUES (6, 'johnson.emily@gmail.com', 'Emily54', 'Johnson', 'Emily', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 2);
INSERT INTO public.user_account VALUES (7, 'davis.micheal@gmail.com', 'Kirby54', 'Davis', 'Michael', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);
INSERT INTO public.user_account VALUES (8, 'sarah.miller@gmail.com', 'ZonGoulo', 'Miller', 'Sarah', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 2);
INSERT INTO public.user_account VALUES (9, 'david.wilson@gmail.com', 'HunterKiller666', 'Wilson', 'David', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);
INSERT INTO public.user_account VALUES (10, 'emma.taylor@gmail.com', 'Michel', 'Taylor', 'Emma', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 2);
INSERT INTO public.user_account VALUES (11, 'antoine.daniel@gmail.com', 'AntoinetoineDaniel', 'Daniel', 'Antoine', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 1);
INSERT INTO public.user_account VALUES (12, 'thomas.olivia@gmail.com', 'JojoBernard45', 'Thomas', 'Olivia', 'f2d81a260dea8a100dd517984e53c56a7523d96942a834b9cdc249bd4e8c7aa9', 'user', 2);


--
-- TOC entry 4952 (class 0 OID 49496)
-- Dependencies: 230
-- Data for Name: user_account_has_friend; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_account_has_friend VALUES (1, 3, true);
INSERT INTO public.user_account_has_friend VALUES (1, 4, false);
INSERT INTO public.user_account_has_friend VALUES (2, 5, true);
INSERT INTO public.user_account_has_friend VALUES (2, 6, false);
INSERT INTO public.user_account_has_friend VALUES (3, 7, true);
INSERT INTO public.user_account_has_friend VALUES (4, 8, false);
INSERT INTO public.user_account_has_friend VALUES (5, 9, true);
INSERT INTO public.user_account_has_friend VALUES (6, 10, false);


--
-- TOC entry 4953 (class 0 OID 49500)
-- Dependencies: 231
-- Data for Name: user_account_has_lesson; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_account_has_lesson VALUES (1, 1);
INSERT INTO public.user_account_has_lesson VALUES (2, 2);
INSERT INTO public.user_account_has_lesson VALUES (3, 3);
INSERT INTO public.user_account_has_lesson VALUES (4, 4);
INSERT INTO public.user_account_has_lesson VALUES (5, 5);
INSERT INTO public.user_account_has_lesson VALUES (6, 1);
INSERT INTO public.user_account_has_lesson VALUES (7, 2);
INSERT INTO public.user_account_has_lesson VALUES (8, 3);
INSERT INTO public.user_account_has_lesson VALUES (9, 4);
INSERT INTO public.user_account_has_lesson VALUES (10, 5);


--
-- TOC entry 4955 (class 0 OID 49504)
-- Dependencies: 233
-- Data for Name: user_response; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_response VALUES (1, 1, 1, 1);
INSERT INTO public.user_response VALUES (2, 5, 2, 1);
INSERT INTO public.user_response VALUES (3, 10, 3, 1);
INSERT INTO public.user_response VALUES (4, 14, 4, 1);
INSERT INTO public.user_response VALUES (5, 20, 5, 1);
INSERT INTO public.user_response VALUES (6, 22, 6, 1);
INSERT INTO public.user_response VALUES (7, 26, 7, 1);
INSERT INTO public.user_response VALUES (8, 29, 8, 1);
INSERT INTO public.user_response VALUES (9, 33, 9, 1);
INSERT INTO public.user_response VALUES (10, 37, 10, 1);


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

SELECT pg_catalog.setval('public.quiz_result_id_seq', 1, true);


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

SELECT pg_catalog.setval('public.user_response_id_seq', 10, true);


--
-- TOC entry 4751 (class 2606 OID 49518)
-- Name: avatar avatar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.avatar
    ADD CONSTRAINT avatar_pkey PRIMARY KEY (id);


--
-- TOC entry 4755 (class 2606 OID 49520)
-- Name: lesson_has_similary lesson_has_similary_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_pkey PRIMARY KEY (id_lesson, id_lesson_similary);


--
-- TOC entry 4753 (class 2606 OID 49522)
-- Name: lesson lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson
    ADD CONSTRAINT lesson_pkey PRIMARY KEY (id);


--
-- TOC entry 4757 (class 2606 OID 49524)
-- Name: question question_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (id);


--
-- TOC entry 4761 (class 2606 OID 49526)
-- Name: quiz_has_lesson quiz_has_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_pkey PRIMARY KEY (id_quiz, id_lesson);


--
-- TOC entry 4759 (class 2606 OID 49528)
-- Name: quiz quiz_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz
    ADD CONSTRAINT quiz_pkey PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 49530)
-- Name: quiz_result quiz_result_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_pkey PRIMARY KEY (id);


--
-- TOC entry 4765 (class 2606 OID 49532)
-- Name: response response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_pkey PRIMARY KEY (id);


--
-- TOC entry 4767 (class 2606 OID 49534)
-- Name: user_account user_account_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_email_key UNIQUE (email);


--
-- TOC entry 4773 (class 2606 OID 49536)
-- Name: user_account_has_friend user_account_has_friend_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_pkey PRIMARY KEY (id_user_account, id_friend);


--
-- TOC entry 4775 (class 2606 OID 49538)
-- Name: user_account_has_lesson user_account_has_lesson_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_pkey PRIMARY KEY (id_user_account, id_lesson);


--
-- TOC entry 4769 (class 2606 OID 49540)
-- Name: user_account user_account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pkey PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 49542)
-- Name: user_account user_account_pseudo_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_pseudo_key UNIQUE (pseudo);


--
-- TOC entry 4777 (class 2606 OID 49544)
-- Name: user_response user_response_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_pkey PRIMARY KEY (id);


--
-- TOC entry 4778 (class 2606 OID 49545)
-- Name: lesson_has_similary lesson_has_similary_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4779 (class 2606 OID 49550)
-- Name: lesson_has_similary lesson_has_similary_id_lesson_similary_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_has_similary
    ADD CONSTRAINT lesson_has_similary_id_lesson_similary_fkey FOREIGN KEY (id_lesson_similary) REFERENCES public.lesson(id);


--
-- TOC entry 4780 (class 2606 OID 49555)
-- Name: question question_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.question
    ADD CONSTRAINT question_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4781 (class 2606 OID 49560)
-- Name: quiz_has_lesson quiz_has_lesson_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4782 (class 2606 OID 49565)
-- Name: quiz_has_lesson quiz_has_lesson_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_has_lesson
    ADD CONSTRAINT quiz_has_lesson_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4783 (class 2606 OID 49570)
-- Name: quiz_result quiz_result_id_quiz_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_id_quiz_fkey FOREIGN KEY (id_quiz) REFERENCES public.quiz(id);


--
-- TOC entry 4784 (class 2606 OID 49575)
-- Name: quiz_result quiz_result_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_result
    ADD CONSTRAINT quiz_result_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4785 (class 2606 OID 49580)
-- Name: response response_id_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.response
    ADD CONSTRAINT response_id_question_fkey FOREIGN KEY (id_question) REFERENCES public.question(id);


--
-- TOC entry 4787 (class 2606 OID 49585)
-- Name: user_account_has_friend user_account_has_friend_id_friend_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_id_friend_fkey FOREIGN KEY (id_friend) REFERENCES public.user_account(id);


--
-- TOC entry 4788 (class 2606 OID 49590)
-- Name: user_account_has_friend user_account_has_friend_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_friend
    ADD CONSTRAINT user_account_has_friend_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4789 (class 2606 OID 49595)
-- Name: user_account_has_lesson user_account_has_lesson_id_lesson_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_id_lesson_fkey FOREIGN KEY (id_lesson) REFERENCES public.lesson(id);


--
-- TOC entry 4790 (class 2606 OID 49600)
-- Name: user_account_has_lesson user_account_has_lesson_id_user_account_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account_has_lesson
    ADD CONSTRAINT user_account_has_lesson_id_user_account_fkey FOREIGN KEY (id_user_account) REFERENCES public.user_account(id);


--
-- TOC entry 4786 (class 2606 OID 49605)
-- Name: user_account user_account_id_avatar_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_account
    ADD CONSTRAINT user_account_id_avatar_fkey FOREIGN KEY (id_avatar) REFERENCES public.avatar(id);


--
-- TOC entry 4791 (class 2606 OID 49610)
-- Name: user_response user_response_id_question_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_question_fkey FOREIGN KEY (id_question) REFERENCES public.question(id);


--
-- TOC entry 4792 (class 2606 OID 49615)
-- Name: user_response user_response_id_quiz_result_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_quiz_result_fkey FOREIGN KEY (id_quiz_result) REFERENCES public.quiz_result(id);


--
-- TOC entry 4793 (class 2606 OID 49620)
-- Name: user_response user_response_id_response_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_response
    ADD CONSTRAINT user_response_id_response_fkey FOREIGN KEY (id_response) REFERENCES public.response(id);


-- Completed on 2024-11-07 16:53:04

--
-- PostgreSQL database dump complete
--

