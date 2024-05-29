import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from './modules/auth/guards/auth.guard';
import {DefaultLayoutComponent} from './core/default-layout/default-layout.component';
import {DashboardComponent} from './modules/dashboard/dashboard.component';
import {LoginComponent} from './modules/auth/login/login.component';
import {RegisterComponent} from './modules/auth/register/register.component';
// import {ResetPasswordComponent} from './modules/auth/reset-password/reset-password.component';
import {HomeComponent} from "./modules/home/home.component";
import {LoginV3Component} from "./modules/login-v3/login-v3.component";
import {IntroductionComponent} from "./modules/default-page/introduction/introduction.component";
import {PriceDimondTableComponent} from "./modules/default-page/price-dimond-table/price-dimond-table.component";
import {MeasureJewelrySizeComponent} from "./modules/default-page/measure-jewelry-size/measure-jewelry-size.component";
import {AddProductComponent} from "./modules/add-product/add-product.component";
import {UserProfileComponent} from "./modules/user-profile/user-profile.component";
import {FileUploadComponent} from "./modules/file-upload/file-upload.component";
import {HomePageComponent} from "./modules/pages/home-page/home-page.component";
import {AboutComponent} from "./modules/pages/about/about.component";
import {ArticleComponent} from "./modules/pages/article/article.component";
import {BlogComponent} from "./modules/pages/blog/blog.component";
import {CartComponent} from "./modules/pages/cart/cart.component";
import {CheckoutComponent} from "./modules/pages/checkout/checkout.component";
import {ContactUsComponent} from "./modules/pages/contact-us/contact-us.component";
import {FaqsComponent} from "./modules/pages/faqs/faqs.component";
import {MyLoginComponent} from "./modules/pages/my-login/my-login.component";
import {MyAccountComponent} from "./modules/pages/my-account/my-account.component";
import {OrderSummeryComponent} from "./modules/pages/order-summery/order-summery.component";
import {PrivacyPolicyComponent} from "./modules/pages/privacy-policy/privacy-policy.component";
import {ProductListComponent} from "./modules/pages/product-list/product-list.component";
import {ProductComponent} from "./modules/pages/product/product.component";
import {RegisterPageComponent} from "./modules/pages/register-page/register-page.component";
import {WishListComponent} from "./modules/pages/wish-list/wish-list.component";
import {ResetPasswordComponent} from "./modules/pages/reset-password/reset-password.component";
import {ForgetPasswordComponent} from "./modules/pages/forget-password/forget-password.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home-page',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    // canActivate: [authGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'widgets',
        loadChildren: () =>
          import('./modules/common/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'simple-table',
        loadChildren: () =>
          import('./modules/common/tables/simple-table/simple-table.module').then((m) => m.DataTableModule)
      },
      {
        path: 'gallery',
        loadChildren: () => import('./modules/common/gallery/gallery.module').then(m => m.GalleryModule)
      },
      {
        path: 'kanban-board',
        loadChildren: () => import('./modules/common/kanban-board/kanban-board.module').then(m => m.KanbanBoardModule)
      },
      {
        path: 'modals-alerts',
        loadChildren: () => import('./modules/common/ui-elements/modals-alerts/modals-alerts.module').then(m => m.ModalsAlertsModule)
      },
      {
        path: 'navs-tabs',
        loadChildren: () => import('./modules/common/ui-elements/navs-tabs/navs-tabs.module').then(m => m.NavsTabsModule)
      },
      {
        path: 'general-form-elements',
        loadChildren: () => import('./modules/forms/general-form-elements/general-form-elements.module').then(m => m.GeneralFormElementsModule)
      },
      {
        path: 'advance-form-elements',
        loadChildren: () => import('./modules/forms/advance-form-elements/advance-form-elements.module').then(m => m.AdvanceFormElementsModule)
      },
      {
        path: 'validation',
        loadChildren: () => import('./modules/forms/validation/validation.module').then(m => m.ValidationModule)
      },
      {
        path: 'inbox',
        loadChildren: () => import('./modules/common/mailbox/inbox/inbox.module').then(m => m.InboxModule)
      },
      {
        path: 'compose',
        loadChildren: () => import('./modules/common/mailbox/compose/compose.module').then(m => m.ComposeModule)
      },
      {path: 'read', loadChildren: () => import('./modules/common/mailbox/read/read.module').then(m => m.ReadModule)},
      {
        path: 'invoice',
        loadChildren: () => import('./modules/common/pages/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/common/pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/common/pages/projects/projects.module').then(m => m.ProjectsModule)
      },
      {
        path: 'projects-add',
        loadChildren: () => import('./modules/common/pages/projects-add/projects-add.module').then(m => m.ProjectsAddModule)
      },
      {
        path: 'project-edit',
        loadChildren: () => import('./modules/common/pages/project-edit/project-edit.module').then(m => m.ProjectEditModule)
      },
      {
        path: 'project-detail',
        loadChildren: () => import('./modules/common/pages/project-detail/project-detail.module').then(m => m.ProjectDetailModule)
      },
      {
        path: 'contacts',
        loadChildren: () => import('./modules/common/pages/contacts/contacts.module').then(m => m.ContactsModule)
      },
      {path: 'faq', loadChildren: () => import('./modules/common/pages/faq/faq.module').then(m => m.FaqModule)},
      {
        path: 'contact-us',
        loadChildren: () => import('./modules/common/pages/contact-us/contact-us.module').then(m => m.ContactUsModule)
      },
      {
        path: 'login-v1',
        loadChildren: () => import('./modules/common/extras/login-v1/login-v1.module').then(m => m.LoginV1Module)
      },
      {
        path: 'register-v1',
        loadChildren: () => import('./modules/common/extras/register-v1/register-v1.module').then(m => m.RegisterV1Module)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('./modules/common/extras/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      {
        path: 'recover-password',
        loadChildren: () => import('./modules/common/extras/recover-password/recover-password.module').then(m => m.RecoverPasswordModule)
      },
      {
        path: 'login-v2',
        loadChildren: () => import('./modules/common/extras/login-v2/login-v2.module').then(m => m.LoginV2Module)
      },
      {
        path: 'register-v2',
        loadChildren: () => import('./modules/common/extras/register-v2/register-v2.module').then(m => m.RegisterV2Module)
      },
      {
        path: 'forgot-password-v2',
        loadChildren: () => import('./modules/common/extras/forgot-password-v2/forgot-password-v2.module').then(m => m.ForgotPasswordV2Module)
      },
      {
        path: 'recover-password-v2',
        loadChildren: () => import('./modules/common/extras/recover-password-v2/recover-password-v2.module').then(m => m.RecoverPasswordV2Module)
      },
      {
        path: 'lock-screen',
        loadChildren: () => import('./modules/common/extras/lock-screen/lock-screen.module').then(m => m.LockScreenModule)
      },
      {
        path: 'legacy-user-menu',
        loadChildren: () => import('./modules/common/extras/legacy-user-menu/legacy-user-menu.module').then(m => m.LegacyUserMenuModule)
      },
      {
        path: 'language-menu',
        loadChildren: () => import('./modules/common/extras/language-menu/language-menu.module').then(m => m.LanguageMenuModule)
      },
      {
        path: 'error-page-v1',
        loadChildren: () => import('./modules/common/extras/error-page-v1/error-page-v1.module').then(m => m.ErrorPageV1Module)
      },
      {
        path: 'error-page-v2',
        loadChildren: () => import('./modules/common/extras/error-page-v2/error-page-v2.module').then(m => m.ErrorPageV2Module)
      },
      {path: 'pace', loadChildren: () => import('./modules/common/extras/pace/pace.module').then(m => m.PaceModule)},
      {
        path: 'blank-page',
        loadChildren: () => import('./modules/common/extras/blank-page/blank-page.module').then(m => m.BlankPageModule)
      },
      {
        path: 'starter-page',
        loadChildren: () => import('./modules/common/extras/starter-page/starter-page.module').then(m => m.StarterPageModule)
      },
      {
        path: 'simple-search',
        loadChildren: () => import('./modules/common/search/simple-search/simple-search.module').then(m => m.SimpleSearchModule)
      },
      {
        path: 'enhanced-search',
        loadChildren: () => import('./modules/common/search/enhanced-search/enhanced-search.module').then(m => m.EnhancedSearchModule)
      },

    ]
  },
  {path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule)},
  {
    path: 'ecommerce',
    loadChildren: () => import('./modules/common/pages/ecommerce/ecommerce.module').then(m => m.EcommerceModule)
  },
  {
    path: 'login',
    // canActivate: [authGuard],
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'dashboard',
    // canActivate: [authGuard],
    component: DashboardComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'home Page'
    }
  },
  {
    path: 'login-v3',
    component: LoginV3Component,
    data: {
      title: 'Login Page'
    }
  },

  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'gioi-thieu',
    component: IntroductionComponent,
    data: {
      title: 'Introduction Page'
    }
  },
  {
    path: 'bang-gia-kim-cuong',
    component: PriceDimondTableComponent,
    data: {
      title: 'Price diamond Page'
    }
  },
  {
    path: 'huong-dan-do-size-trang-suc-day-chuyen',
    component: MeasureJewelrySizeComponent,
    data: {
      title: 'Measure Jewelry Size Page'
    }
  },
    {
    path: 'add-product',
    component: AddProductComponent,
    data: {
      title: 'Add Product Page'
    }
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: {
      title: 'User Profile Page'
    }
  },
  {
    path: 'upload-avatar',
    component: FileUploadComponent,
    data: {
      title: 'Upload File Page'
    }
  },
  {
    path: 'home-page',
    component: HomePageComponent,
    data: {
      title: 'Home Page'
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: {
      title: 'About Page'
    }
  },
  {
    path: 'article',
    component: ArticleComponent,
    data: {
      title: 'Article Page'
    }
  },
  {
    path: 'blog',
    component: BlogComponent,
    data: {
      title: 'Blog Page'
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: {
      title: 'Cart Page'
    }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: {
      title: 'Cart Page'
    }
  },
  {
    path: 'contact-us-v2',
    component: ContactUsComponent,
    data: {
      title: 'Contact us Page'
    }
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    data: {
      title: 'Fags Page'
    }
  },
  {
    path: 'my-login',
    component: MyLoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'my-account',
    component: MyAccountComponent,
    data: {
      title: 'My account Page'
    }
  },
  {
    path: 'order-summery',
    component: OrderSummeryComponent,
    data: {
      title: 'Order Summery Page'
    }
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {
      title: 'Privacy Policy Page'
    }
  },
  {
    path: 'product-list',
    component: ProductListComponent,
    data: {
      title: 'Product List Page'
    }
  },
  {
    path: 'product',
    component: ProductComponent,
    data: {
      title: 'Product Page'
    }
  },
  {
    path: 'register-page',
    component: RegisterPageComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'wish-list',
    component: WishListComponent,
    data: {
      title: 'Wish List Page'
    }
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    data: {
      title: 'Reset Password Page'
    }
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    data: {
      title: 'Forget Password Page'
    }
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
