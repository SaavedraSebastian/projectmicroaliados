// src/app/core/services/mock-modal.service.ts
import { Injectable } from '@angular/core';
import { Activity, Speaker, Milestone } from '../../shared/models/mock-modal.model';


@Injectable()
export class MockModalService {
  showError(message: string) {
    console.error(message);
  }

  showSuccess(message: string) {
    console.log(message);
  }

  openActivityDetails(activity: Activity) {
    console.log('Activity details:', activity);
  }

  openSpeakerDetails(speaker: Speaker) {
    console.log('Speaker details:', speaker);
  }

  openMilestoneDetails(milestone: Milestone) {
    console.log('Milestone details:', milestone);
  }
}
