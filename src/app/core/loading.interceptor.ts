import { inject } from "@angular/core";
import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { finalize } from "rxjs";
import { LoadingService } from "./loading.service";

export const loadingInterceptor: HttpInterceptorFn= (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const loading = inject(LoadingService);

  loading.start();

  return next(req).pipe(
    finalize(() => loading.stop())
  );
};