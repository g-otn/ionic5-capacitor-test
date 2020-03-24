import { CallNumber } from '@ionic-native/call-number/ngx';
import { Platform, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public imgsrc: string;
  public result: string;
  public err: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private platform: Platform,
    private callNumber: CallNumber,
    private alert: AlertController,
    private toast: ToastController
  ) { }

  ngOnInit() {
    console.log(this.activatedRoute);
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  capacitorGeolocation() {
    Plugins.Geolocation.requestPermissions()
      .then(value => {
        this.result = this.json(value);
        Plugins.Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 3000
        })
          .then(value => {
            this.result += this.json(value);
          })
      })
      .catch(reason => this.err = this.json(reason));
  }

  capacitorSplashScreen() {
    Plugins.SplashScreen.show({ autoHide: true });
  }

  capacitorPhotoPrompt() {
    Plugins.Camera.requestPermissions()
      .then(value => {
        this.result = this.json(value);
        Plugins.Camera.getPhoto({
          source: CameraSource.Prompt,
          resultType: CameraResultType.DataUrl,
          saveToGallery: true,
          quality: 10
        })
          .then(value => {
            this.imgsrc = value.dataUrl
          })
      })
      .catch(reason => this.err = this.json(reason));
  }

  capacitorPhotoGallery() {
    Plugins.Camera.requestPermissions()
      .then(value => {
        this.result = this.json(value);
        Plugins.Camera.getPhoto({
          source: CameraSource.Photos,
          resultType: CameraResultType.DataUrl,
          saveToGallery: true,
          quality: 10
        })
          .then(value => {
            this.imgsrc = value.dataUrl
          })
      })
      .catch(reason => this.err = this.json(reason));
  }

  capacitorPhotoCamera() {
    Plugins.Camera.requestPermissions()
      .then(value => {
        this.result = this.json(value);
        Plugins.Camera.getPhoto({
          source: CameraSource.Camera,
          resultType: CameraResultType.DataUrl,
          saveToGallery: true,
          quality: 10
        })
          .then(value => {
            this.imgsrc = value.dataUrl
          })
      })
      .catch(reason => this.err = this.json(reason));
  }

  capacitorToast() {
    Plugins.Toast.show({
      text: 'Teste toast 3s center',
      duration: 'long',
      position: 'center'
    })
  }

  capacitorAlert() {
    Plugins.PushNotifications.requestPermissions()
      .then(value => {
        this.result = this.json(value);
      });
  }

  cordovaCallNumber(bypass = true) {
    this.callNumber.callNumber('+5511900000000', bypass);
  }

  angularToast() {
    this.toast.create({
      header: 'toast angular',
      message: 'mensagem',
      buttons: ['Ok', 'Ok2']
    }).then(value => {
      value.present();
    });
  }

  angularAlert() {
    this.alert.create({
      header: 'alert angular',
      subHeader: 'sub header',
      message: 'message',
      buttons: ['Button 1', 'Button 2']
    }).then(value => value.present());
  }

  json(value) {
    return JSON.stringify(value, null, ' ');
  }

}
