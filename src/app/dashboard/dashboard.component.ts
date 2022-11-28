import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserManagementService } from '../service/user-management.service';
import { OverlayConfig, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { UserFormComponent } from '../user-form/user-form.component';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userData!: Array<User>;
  overlayRef!: OverlayRef;
  sub = new Subscription();

  constructor(private user: UserManagementService, private overlay: Overlay) {}

  ngOnInit(): void {
    this.getUser();
  }

  openOverlay(id?:number) {
    const config = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['modal', 'active'],
      backdropClass: 'modal-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    this.overlayRef = this.overlay.create(config);
    const ref = this.overlayRef.attach(new ComponentPortal(UserFormComponent));
    if(id){
      ref.instance.id = id;
    }
     
    this.sub.add(ref.instance.closePannel.subscribe(() =>{ this.overlayRef.dispose(); this.getUser()}));
    }

    getUser() {
      this.sub.add(this.user.getUsers().subscribe({
        next: (data: Array<User>) => {
          this.userData = data;
        },
        error: (err: any) => {
          console.log(err.error);
        },
      }));
    }

    deleteUser(id:number) {
      this.sub.add(this.user.deleteUser(id).subscribe(() => this.getUser()));
      
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }
}



