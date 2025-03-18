import {
  DashboardOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  ShoppingOutlined,
  UserOutlined,
  GiftOutlined,
  PictureOutlined,
  UsergroupDeleteOutlined,
  MobileOutlined,
  FilePdfOutlined,
  SettingOutlined,
  BranchesOutlined
} from "@ant-design/icons";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "main",
    path: `${APP_PREFIX_PATH}/main`,
    title: "Основные",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards",
        path: `${APP_PREFIX_PATH}/main/dashboards`,
        title: "Дашборд",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: 'layoutScheme',
        path: `${APP_PREFIX_PATH}/main/layoutScheme`,
        title: 'Схема размещения',
        icon: BranchesOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-catalog",
        path: `${APP_PREFIX_PATH}/main/catalog`,
        title: "Каталог",
        icon: ShoppingCartOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "catalog-products",
            path: `${APP_PREFIX_PATH}/main/catalog/products`,
            title: "Товары",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "catalog-categories",
            path: `${APP_PREFIX_PATH}/main/catalog/categories`,
            title: "Категории",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "catalog-collections",
            path: `${APP_PREFIX_PATH}/main/catalog/collections`,
            title: "Коллекции",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "catalog-combo",
            path: `${APP_PREFIX_PATH}/main/catalog/combo`,
            title: "Комбо",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "main-orders",
        path: `${APP_PREFIX_PATH}/main/orders`,
        title: "Заказы",
        icon: ShoppingOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-clients",
        path: `${APP_PREFIX_PATH}/main/clients`,
        title: "Клиенты",
        icon: UserOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "clients-list",
            path: `${APP_PREFIX_PATH}/main/clients/list`,
            title: "Список клиентов",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "clients-groups",
            path: `${APP_PREFIX_PATH}/main/clients/groups`,
            title: "Группа клиентов",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
          {
            key: "clients-edit",
            path: `${APP_PREFIX_PATH}/main/clients/edit`,
            title: "Редактор клиента",
            icon: "",
            breadcrumb: true,
            submenu: [],
          },
        ],
      },
      {
        key: "main-banners",
        path: `${APP_PREFIX_PATH}/main/banners`,
        title: "Баннеры",
        icon: PictureOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-promo",
        path: `${APP_PREFIX_PATH}/main/promo`,
        title: "Промокоды",
        icon: GiftOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-offline",
        path: `${APP_PREFIX_PATH}/main/offline`,
        title: "Оффлайн точки",
        icon: ShopOutlined,
        breadcrumb: true,
        submenu: [
          {
            key: "offline-addresses",
            path: `${APP_PREFIX_PATH}/main/offline/addresses`,
            title: "Адреса",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "offline-geozones",
            path: `${APP_PREFIX_PATH}/main/offline/geozones`,
            title: "Геозоны",
            icon: "",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
      {
        key: "main-employees",
        path: `${APP_PREFIX_PATH}/main/employees`,
        title: "Сотрудники",
        icon: UsergroupDeleteOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "main-spam",
        path: `${APP_PREFIX_PATH}/main/spam`,
        title: "Рассылка",
        icon: MailOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const sistemNavTree = [
  {
    key: "sistem",
    path: `${APP_PREFIX_PATH}/sistem`,
    title: "Системные",
    icon: SettingOutlined, // Добавим иконку для раздела
    breadcrumb: false,
    submenu: [
      {
        key: "settings",
        path: `${APP_PREFIX_PATH}/sistem/settings`,
        title: "Настройки",
        icon: SettingOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "mobile",
        path: `${APP_PREFIX_PATH}/sistem/mobile`,
        title: "Мобильное приложение",
        icon: MobileOutlined,
        breadcrumb: false,
        submenu: [],
      },
      {
        key: "logs",
        path: `${APP_PREFIX_PATH}/sistem/logs`,
        title: "Логи",
        icon: FilePdfOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const navigationConfig = [
  ...dashBoardNavTree,
  ...sistemNavTree,
];

export default navigationConfig;
