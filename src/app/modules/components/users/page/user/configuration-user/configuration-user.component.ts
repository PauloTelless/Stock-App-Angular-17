import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { GenderUser } from '../../../../../../models/user/genderUser';
import { StateUser } from '../../../../../../models/user/stateUset';
import { ConfigurationUser } from '../../../../../../models/user/configurationUser';
import { ConfigurationUserSuccessComponent } from './configuration-user-success/configuration-user-success.component';

@Component({
  selector: 'app-configuration-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './configuration-user.component.html',
  styleUrl: './configuration-user.component.sass'
})
export class ConfigurationUserComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

  ngOnInit(): void {
    const configurationUserLocalStorage = localStorage.getItem('configurationUser');
    if (configurationUserLocalStorage) {
      const configurationUserJson = JSON.parse(configurationUserLocalStorage) as ConfigurationUser;
      this.configurationUser = configurationUserJson;
    }

    this.configurationUserForm = this.formBuilder.group({
      userName: [{value: this.userName, disabled: true}],
      userNameCompleted: this.configurationUser.userNameCompleted,
      streetUser: this.configurationUser.streetUser,
      cityUser: this.configurationUser.cityUser,
      stateUser: this.configurationUser.stateUser,
      officeUser: [{value: 'Administrador', disabled: true}],
      numberUser: this.configurationUser.numberUser,
      genderUser: this.configurationUser.genderUser
    });
  }

  private configurationUser!: ConfigurationUser;
  private dialogRef = inject(MatDialogRef);
  private dialogService = inject(MatDialog);
  private formBuilder = inject(FormBuilder);
  public userName = (this.data as string).toLowerCase();
  public selectGenderUser: Array<GenderUser> = [
    {value: 'Masculino', valueView: 'Masculino'},
    {value: 'Feminimo', valueView: 'Feminino'},
    {value: 'Prefere não dizer', valueView: 'Prefiro não dizer'},
  ]
  public selectStateUser: Array<StateUser> = [
      { value: 'Acre', valueView: 'Acre' },
      { value: 'Alagoas', valueView: 'Alagoas' },
      { value: 'Amapá', valueView: 'Amapá' },
      { value: 'Amazonas', valueView: 'Amazonas' },
      { value: 'Bahia', valueView: 'Bahia' },
      { value: 'Ceará', valueView: 'Ceará' },
      { value: 'Distrito Federal', valueView: 'Distrito Federal' },
      { value: 'Espírito Santo', valueView: 'Espírito Santo' },
      { value: 'Goiás', valueView: 'Goiás' },
      { value: 'Maranhão', valueView: 'Maranhão' },
      { value: 'Mato Grosso', valueView: 'Mato Grosso' },
      { value: 'Mato Grosso do Sul', valueView: 'Mato Grosso do Sul' },
      { value: 'Minas Gerais', valueView: 'Minas Gerais' },
      { value: 'Pará', valueView: 'Pará' },
      { value: 'Paraíba', valueView: 'Paraíba' },
      { value: 'Paraná', valueView: 'Paraná' },
      { value: 'Pernambuco', valueView: 'Pernambuco' },
      { value: 'Piauí', valueView: 'Piauí' },
      { value: 'Rio de Janeiro', valueView: 'Rio de Janeiro' },
      { value: 'Rio Grande do Norte', valueView: 'Rio Grande do Norte' },
      { value: 'Rio Grande do Sul', valueView: 'Rio Grande do Sul' },
      { value: 'Rondônia', valueView: 'Rondônia' },
      { value: 'Roraima', valueView: 'Roraima' },
      { value: 'Santa Catarina', valueView: 'Santa Catarina' },
      { value: 'São Paulo', valueView: 'São Paulo' },
      { value: 'Sergipe', valueView: 'Sergipe' },
      { value: 'Tocantins', valueView: 'Tocantins' }
  ]


  configurationUserForm = this.formBuilder.group({
    userName: [{value: this.userName, disabled: true}],
    userNameCompleted: [''],
    streetUser: [''],
    cityUser: [''],
    stateUser: [''],
    officeUser: [{value: 'Administrador', disabled: true}],
    numberUser: [''],
    genderUser: [''],
  });

  closeModalConfigurationUser(): void{
    this.dialogRef.close();
  };

  selecionarGeneroUsuario(event: MatSelectChange): void{
    const nomeGenero = event.value;
    this.configurationUserForm.patchValue({genderUser: nomeGenero})
  }

  selecionarEstadoUsuario(event: MatSelectChange): void{
    const estadoUsuario = event.value;
    this.configurationUserForm.patchValue({stateUser: estadoUsuario});
  }

  saveLocalStorageConfigurationUser(): void{
    const configurationUser = this.configurationUserForm.value as ConfigurationUser
    const jsonConfigurationUser = JSON.stringify(configurationUser);

    localStorage.setItem('configurationUser', jsonConfigurationUser);

    this.dialogRef.close();

    this.dialogService.open(ConfigurationUserSuccessComponent, {
      width: '300px',
      height: '300px'
    })
  }

}
