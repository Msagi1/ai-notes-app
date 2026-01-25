import { Injectable, signal } from "@angular/core";

@Injectable({providedIn:'root'})

export class LoadingService{
    private _count = signal(0);
    isLoading = signal(false);

    start(){
        this._count.update(c=> c + 1);
        this.isLoading.set(true);
    }

    stop(){
        this._count.update(c=> Math.max(0, c - 1));
        if(this._count() === 0) this.isLoading.set(false);
    }
}